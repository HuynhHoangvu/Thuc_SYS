// Replaces the student pipeline with the 7-phase stages (with email templates)
// and moves students from old stage keys to the closest new one.
// Also copies `email` into `personalEmail` for students created before the two-email split.
//
// Usage: DATABASE_URL=... npx tsx scripts/migrate-student-stages.ts [--map=old:new ...] [--keep=key ...] [--yes]
//   --map=old:new  move students on a custom stage to a new stage (repeatable)
//   --keep=key     keep a custom stage (and its students); it is placed before "Đóng" (repeatable)
// Without --yes it only prints what it would do. Back the database up first.
import 'dotenv/config';
import mongoose from 'mongoose';
import { StageTemplate } from '../src/models/StageTemplate';
import { Student } from '../src/models/Student';
import { DEFAULT_STAGES } from '../src/lib/stages/dto';

const OLD_TO_NEW: Record<string, string> = {
  lead: 'lead',
  consultation: 'lead',
  application: 'nop_ho_so',
  offer: 'xin_visa',
  visa: 'lich_pv',
  enrolled: 'dau_visa',
  closed: 'closed',
};

function argList(flag: string) {
  return process.argv.filter((a) => a.startsWith(`${flag}=`)).map((a) => a.slice(flag.length + 1));
}

async function main() {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error('DATABASE_URL environment variable is not set');
  const apply = process.argv.includes('--yes');
  const host = uri.replace(/\/\/[^@]*@/, '//***@');

  const mapping = { ...OLD_TO_NEW };
  for (const pair of argList('--map')) {
    const [from, to] = pair.split(':');
    if (!from || !to) throw new Error(`Bad --map value: ${pair}`);
    mapping[from] = to;
  }
  const keep = new Set(argList('--keep'));
  const newKeys = new Set(DEFAULT_STAGES.map((s) => s.key));
  for (const to of Object.values(mapping)) {
    if (!newKeys.has(to) && !keep.has(to)) throw new Error(`Mapping target "${to}" is not a new stage`);
  }

  await mongoose.connect(uri);
  console.log(`${apply ? 'Applying to' : 'DRY RUN on'} ${host} (db: ${mongoose.connection.name})`);

  const kept = await StageTemplate.find({ type: 'student', key: { $in: [...keep] } }).sort({ order: 1 });
  const missing = [...keep].filter((k) => !kept.some((s) => s.key === k));
  if (missing.length) throw new Error(`--keep stage(s) not found: ${missing.join(', ')}`);

  for (const [oldKey, newKey] of Object.entries(mapping)) {
    if (oldKey === newKey) continue;
    const n = await Student.countDocuments({ stage: oldKey });
    if (!n) continue;
    console.log(`Move ${n} student(s) ${oldKey} -> ${newKey}`);
    if (apply) await Student.updateMany({ stage: oldKey }, { stage: newKey });
  }
  // Stages that end up valid: new ones, kept ones, and anything --map / OLD_TO_NEW moves.
  const valid = [...newKeys, ...keep, ...Object.keys(mapping)];
  const orphans = await Student.find({ stage: { $nin: valid } }, { fullName: 1, stage: 1 });
  for (const o of orphans) console.log(`Move unknown stage "${o.stage}" -> lead: ${o.fullName}`);
  if (apply && orphans.length) await Student.updateMany({ stage: { $nin: valid } }, { stage: 'lead' });

  // New pipeline; kept custom stages go just before "Đóng" (last default stage).
  const stages = DEFAULT_STAGES.map((s) => ({ ...s, type: 'student' as const }));
  const closed = stages.pop()!;
  const ordered = [
    ...stages,
    ...kept.map((k) => ({ key: k.key, title: k.title, color: k.color ?? undefined, type: 'student' as const })),
    closed,
  ].map((s, order) => ({ ...s, order }));
  console.log(`Stages: ${ordered.map((s) => s.title).join(' > ')}`);
  if (apply) {
    await StageTemplate.deleteMany({ type: 'student', key: { $nin: [...keep] } });
    for (const s of ordered) {
      if (keep.has(s.key)) await StageTemplate.updateOne({ type: 'student', key: s.key }, { order: s.order });
      else await StageTemplate.create(s);
    }
  }

  const noPersonal = await Student.countDocuments({ personalEmail: { $in: [null, ''] }, email: { $nin: [null, ''] } });
  console.log(`Copy email -> personalEmail for ${noPersonal} student(s)`);
  if (apply && noPersonal) {
    await Student.updateMany({ personalEmail: { $in: [null, ''] }, email: { $nin: [null, ''] } }, [
      { $set: { personalEmail: '$email' } },
    ], { updatePipeline: true });
  }

  if (!apply) console.log('Nothing changed. Re-run with --yes to apply.');
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
