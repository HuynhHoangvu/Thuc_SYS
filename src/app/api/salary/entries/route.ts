import { z } from 'zod';
import { connectDB } from '@/lib/mongoose';
import { SalaryEntry } from '@/models/SalaryEntry';
import { ok, withErrorHandling } from '@/lib/api-handler';

const listQuerySchema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/),
});

const createEntrySchema = z.object({
  monthKey: z.string().regex(/^\d{4}-\d{2}$/),
  label: z.string().min(1),
  amount: z.number().nonnegative(),
  personName: z.string().trim().min(1).optional(),
});

export const GET = withErrorHandling(async (req) => {
  const { searchParams } = new URL(req.url);
  const query = listQuerySchema.parse(Object.fromEntries(searchParams));
  await connectDB();
  const entries = await SalaryEntry.find({ monthKey: query.month }).sort({ createdAt: 1 });
  return ok(entries.map((e) => e.toObject()));
});

export const POST = withErrorHandling(async (req) => {
  const body = createEntrySchema.parse(await req.json());
  await connectDB();
  const entry = await SalaryEntry.create(body);
  return ok(entry.toObject(), 201);
});
