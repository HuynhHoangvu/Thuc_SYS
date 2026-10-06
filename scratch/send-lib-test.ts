import { config } from 'dotenv';
import { readFileSync } from 'node:fs';
config({ path: '.env.local' });
import { sendMail } from '../src/lib/email/mailer';
import { fillLibraryText, libraryHtmlToText } from '../src/lib/email-templates/stage-library';

const raw = readFileSync('email-templates/thu-cam-on-catholic-mta-georgia-italic.html', 'utf8')
  .replace(/Huỳnh Hoàng Vũ/g, '{{tenHocSinh}}').replace(/Huỳnh Phát/g, '{{tenPhuHuynh}}')
  .replace('MTA-2026-0001', '{{maHoSo}}').replace('02/10/2026', '{{ngayTiepNhan}}');
const values = { tenHocSinh: 'HUỲNH VĂN ĐẠT', tenPhuHuynh: '', maHoSo: 'TEST-0001', ngayTiepNhan: '17/09/2026' };
const html = fillLibraryText(raw, values, true);
sendMail({
  to: 'hhoangvu001@gmail.com',
  subject: '[TEST] Thư cảm ơn Catholic MTA (không phụ huynh)',
  html,
  text: libraryHtmlToText(html),
}).then((r) => console.log('OK', r), (e) => { console.error('FAIL', e.message); process.exit(1); });
