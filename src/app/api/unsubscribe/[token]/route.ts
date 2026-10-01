import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Student } from '@/models/Student';

// Form POST from /huy-nhan/[token]; redirects back to show the confirmation.
export async function POST(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  await connectDB();
  await Student.updateOne({ unsubscribeToken: token }, { notifyOptOut: true });
  return NextResponse.redirect(new URL(`/huy-nhan/${encodeURIComponent(token)}?done=1`, req.url), 303);
}
