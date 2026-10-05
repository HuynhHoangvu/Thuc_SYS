#!/usr/bin/env npx tsx
/**
 * Test script: gửi mail cảm ơn thử nghiệm qua Resend đến Outlook
 * Chạy: npx tsx scripts/send-test-thankyou.ts
 */
import { config } from 'dotenv';
import path from 'path';

// Load .env.local
config({ path: path.join(process.cwd(), '.env.local') });

// Resend chỉ cho phép gửi tới email chủ tài khoản khi dùng sender onboarding@resend.dev
// Để gửi tới địa chỉ khác cần verify domain tại resend.com/domains
process.env.MAIL_TEST_RECIPIENT = 'hhoangvu001@gmail.com';

import { sendMail } from '../src/lib/email/mailer';
import { renderEmailHtml, renderEmailText } from '../src/lib/notifications/render';

const SUBJECT = 'Cảm ơn Quý khách đã tin tưởng lựa chọn Catholic MTA';

const BODY = `Kính gửi Quý khách,

Chúng tôi xin chân thành cảm ơn Quý khách đã tin tưởng lựa chọn dịch vụ tư vấn du học của **Catholic MTA**.

Đây là mail thử nghiệm (test) để kiểm tra kết nối Resend → Outlook.

[[LIEN_HE]]

Trân trọng,
**Đội ngũ Catholic MTA**
Tư vấn du học
0909 123 456
info@catholicmta.edu.vn`;

const html = renderEmailHtml({
  subject: SUBJECT,
  body: BODY,
  steps: ['Ký HĐ & thu thập giấy tờ', 'Nộp hồ sơ', 'Chờ kết quả', 'Cấp thư nhập học', 'Xin visa'],
  currentIndex: 0,
  heading: 'Cảm ơn Quý khách\nđã tin tưởng lựa chọn',
  kicker: 'Lời tri ân',
  docLabel: 'Thư cảm ơn',
  eyebrow: 'Dịch vụ hồ sơ du học Mỹ',
  info: [
    ['Học viên', 'Nguyễn Văn Test'],
    ['Mã hồ sơ', 'MTA-2026-0001'],
    ['Quốc gia', 'Mỹ'],
  ],
  assetBase: 'cid:',
});

const text = renderEmailText(BODY);

async function main() {
  console.log('📧 Gửi mail cảm ơn thử nghiệm...');
  console.log('   To (test redirect): hhoangvu001@gmail.com');
  console.log(`   RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✓' : '✗ không có – ghi ra .mail-outbox/'}`);

  const result = await sendMail({
    to: 'hhoangvu001@gmail.com',
    subject: SUBJECT,
    html,
    text,
  });

  console.log('\n✅ Gửi thành công!');
  console.log(`   Provider ID : ${result.providerId}`);
  console.log(`   Test mode   : ${result.testMode}`);
  if (result.testMode) {
    console.log('   → Đã chuyển hướng tới hhoangvu001@gmail.com');
  }
}

main().catch((err) => {
  console.error('\n❌ Lỗi:', err?.message ?? err);
  process.exit(1);
});
