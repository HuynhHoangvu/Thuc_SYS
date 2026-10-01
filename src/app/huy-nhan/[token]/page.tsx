import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongoose';
import { Student } from '@/models/Student';

export const metadata: Metadata = {
  title: 'Ngừng nhận thông báo',
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token } = await params;
  const { done } = await searchParams;
  await connectDB();
  const student = await Student.findOne({ unsubscribeToken: token }, { notifyOptOut: 1 });
  if (!student) notFound();

  const optedOut = done === '1' || student.notifyOptOut;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 text-center">
        <h1 className="mb-3 text-lg font-semibold text-card-foreground">Catholic MTA</h1>
        {optedOut ? (
          <p className="text-sm text-muted-foreground">
            Bạn đã ngừng nhận email thông báo tiến độ hồ sơ. Nếu cần nhận lại, vui lòng liên hệ chuyên viên phụ trách.
          </p>
        ) : (
          <form method="post" action={`/api/unsubscribe/${encodeURIComponent(token)}`} className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Bạn có chắc muốn ngừng nhận email thông báo tiến độ hồ sơ du học?
            </p>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-90"
            >
              Xác nhận ngừng nhận
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
