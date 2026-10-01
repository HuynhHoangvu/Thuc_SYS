import { createHmac, timingSafeEqual } from 'node:crypto';
import { connectDB } from '@/lib/mongoose';
import { Student } from '@/models/Student';
import { NotificationLog } from '@/models/NotificationLog';
import { ok, withErrorHandling } from '@/lib/api-handler';
import { AppError } from '@/lib/errors';

const TOLERANCE_SECONDS = 5 * 60;

// Resend signs webhooks with Svix: HMAC-SHA256 of "id.timestamp.body" using the base64 part of "whsec_...".
function verifySignature(req: Request, payload: string) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) throw new AppError('RESEND_WEBHOOK_SECRET is not configured', 500);
  const id = req.headers.get('svix-id');
  const timestamp = req.headers.get('svix-timestamp');
  const signatures = req.headers.get('svix-signature');
  if (!id || !timestamp || !signatures) throw new AppError('Missing signature headers', 401);
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > TOLERANCE_SECONDS) throw new AppError('Stale webhook', 401);

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${payload}`).digest();
  const valid = signatures.split(' ').some((part) => {
    const [, sig] = part.split(',');
    if (!sig) return false;
    const given = Buffer.from(sig, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
  if (!valid) throw new AppError('Invalid signature', 401);
}

// Later events never downgrade an earlier, stronger one (e.g. "opened" stays after a late "delivered").
const RANK: Record<string, number> = { sent: 0, delivered: 1, opened: 2, complained: 3, bounced: 4 };
const EVENT_STATUS: Record<string, string> = {
  'email.delivered': 'delivered',
  'email.opened': 'opened',
  'email.bounced': 'bounced',
  'email.complained': 'complained',
};

export const POST = withErrorHandling(async (req) => {
  const payload = await req.text();
  verifySignature(req, payload);
  const event = JSON.parse(payload) as { type: string; data?: { email_id?: string } };

  const status = EVENT_STATUS[event.type];
  const emailId = event.data?.email_id;
  if (!status || !emailId) return ok({ ignored: event.type });

  await connectDB();
  const log = await NotificationLog.findOne({ providerId: emailId });
  if (!log) return ok({ ignored: 'unknown email' });

  if ((RANK[status] ?? 0) > (RANK[log.status] ?? 0)) {
    log.status = status as typeof log.status;
    await log.save();
  }
  if (status === 'bounced') {
    // Only flag the student when their own address bounced, not a CC'd parent.
    await Student.updateOne({ _id: log.studentId, personalEmail: log.to }, { emailBounced: true });
  }
  if (status === 'complained') {
    await Student.updateOne({ _id: log.studentId }, { notifyOptOut: true });
  }
  return ok({ status });
});
