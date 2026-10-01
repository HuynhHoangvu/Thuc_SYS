import { AppError } from './errors';

// Vercel Cron (and our own curl) sends `Authorization: Bearer <CRON_SECRET>`.
export function assertCronAuthorized(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) throw new AppError('CRON_SECRET is not configured', 500);
  if (req.headers.get('authorization') !== `Bearer ${secret}`) throw new AppError('Unauthorized', 401);
}
