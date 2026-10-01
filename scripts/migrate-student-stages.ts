// Replaces the student pipeline with the 7-phase stages (with email templates)
// and moves students from old stage keys to the closest new one.
// Usage: DATABASE_URL=... npx tsx scripts/migrate-student-stages.ts --yes
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

async function main() {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error('DATABASE_URL environment variable is not set');
  const host = uri.replace(/\/\/[^@]*@/, '//***@');
  if (!process.argv.includes('--yes')) {
    console.log(`Would replace student stages in ${host}. Re-run with --yes to apply.`);
    return;
  }

  await mongoose.connect(uri);
  console.log(`Connected to ${host}`);

  const newKeys = new Set(DEFAULT_STAGES.map((s) => s.key));
  for (const [oldKey, newKey] of Object.entries(OLD_TO_NEW)) {
    if (oldKey === newKey) continue;
    const res = await Student.updateMany({ stage: oldKey }, { stage: newKey });
    if (res.modifiedCount) console.log(`Moved ${res.modifiedCount} student(s) ${oldKey} -> ${newKey}`);
  }
  const orphan = await Student.updateMany({ stage: { $nin: [...newKeys] } }, { stage: 'lead' });
  if (orphan.modifiedCount) console.log(`Moved ${orphan.modifiedCount} student(s) with unknown stage -> lead`);

  await StageTemplate.deleteMany({ type: 'student' });
  await StageTemplate.insertMany(DEFAULT_STAGES.map((s) => ({ ...s, type: 'student' })));
  console.log(`Inserted ${DEFAULT_STAGES.length} student stages`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
