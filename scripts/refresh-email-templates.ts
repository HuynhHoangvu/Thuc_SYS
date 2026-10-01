// Overwrites each stage's stored email template with the current preset text from code.
// Stages and students are left untouched. Usage: npx tsx scripts/refresh-email-templates.ts --yes
import { config } from 'dotenv';
config({ path: '.env.local' });
config();
import mongoose from 'mongoose';
import { StageTemplate } from '../src/models/StageTemplate';
import { getPreset } from '../src/lib/notifications/templates';

async function main() {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error('DATABASE_URL environment variable is not set');
  if (!process.argv.includes('--yes')) {
    console.log('Would overwrite stage email templates with presets. Re-run with --yes to apply.');
    return;
  }
  await mongoose.connect(uri);
  const stages = await StageTemplate.find({ 'emailTemplate.presetKey': { $exists: true } });
  for (const s of stages) {
    const preset = getPreset(s.emailTemplate?.presetKey ?? undefined);
    if (!preset) continue;
    await StageTemplate.updateOne(
      { _id: s._id },
      { 'emailTemplate.subject': preset.subject, 'emailTemplate.body': preset.body }
    );
    console.log(`Updated ${s.key} <- ${preset.key}`);
  }
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
