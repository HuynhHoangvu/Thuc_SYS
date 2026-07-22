import 'dotenv/config';
import mongoose from 'mongoose';
import { StageTemplate } from '../src/models/StageTemplate';
import { ChecklistTemplate } from '../src/models/ChecklistTemplate';
import { DEFAULT_STAGES, DEFAULT_TRAVEL_STAGES } from '../src/lib/stages/dto';
import { DEFAULT_CHECKLISTS, countryToDb } from '../src/lib/checklists/dto';

async function main() {
  const uri = process.env.DATABASE_URL;
  if (!uri) throw new Error('DATABASE_URL environment variable is not set');

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const studentStageCount = await StageTemplate.countDocuments({ type: 'student' });
  if (studentStageCount === 0) {
    await StageTemplate.insertMany(DEFAULT_STAGES.map((s) => ({ ...s, type: 'student' })));
    console.log('Seeded default student stages');
  } else {
    console.log('Student stages already exist, skipping');
  }

  const travelStageCount = await StageTemplate.countDocuments({ type: 'travel' });
  if (travelStageCount === 0) {
    await StageTemplate.insertMany(DEFAULT_TRAVEL_STAGES.map((s) => ({ ...s, type: 'travel' })));
    console.log('Seeded default travel stages');
  } else {
    console.log('Travel stages already exist, skipping');
  }

  const checklistCount = await ChecklistTemplate.countDocuments();
  if (checklistCount === 0) {
    await ChecklistTemplate.insertMany(
      DEFAULT_CHECKLISTS.map((c) => ({ name: c.name, country: countryToDb(c.country), items: c.items }))
    );
    console.log('Seeded default checklists');
  } else {
    console.log('Checklists already exist, skipping');
  }

  await mongoose.disconnect();
  console.log('Done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
