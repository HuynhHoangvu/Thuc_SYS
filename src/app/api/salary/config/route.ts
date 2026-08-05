import { z } from 'zod';
import { connectDB } from '@/lib/mongoose';
import { SalaryConfig } from '@/models/SalaryConfig';
import { ok, withErrorHandling } from '@/lib/api-handler';

const bonusItemSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  amount: z.number().nonnegative(),
});

const updateConfigSchema = z.object({
  baseSalary: z.number().nonnegative(),
  bonusItems: z.array(bonusItemSchema),
});

async function getOrCreateConfig() {
  let config = await SalaryConfig.findOne();
  if (!config) {
    config = await SalaryConfig.create({
      baseSalary: 10_000_000,
      bonusItems: [
        { id: 'du-hoc', label: 'Đậu hồ sơ du học', amount: 2_500_000 },
        { id: 'du-lich', label: 'Đậu hồ sơ du lịch', amount: 1_000_000 },
      ],
    });
  }
  return config;
}

export const GET = withErrorHandling(async () => {
  await connectDB();
  const config = await getOrCreateConfig();
  return ok(config.toObject());
});

export const PUT = withErrorHandling(async (req) => {
  const body = updateConfigSchema.parse(await req.json());
  await connectDB();
  const config = await getOrCreateConfig();
  config.baseSalary = body.baseSalary;
  config.set('bonusItems', body.bonusItems);
  await config.save();
  return ok(config.toObject());
});
