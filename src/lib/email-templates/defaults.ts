import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { EmailTemplate } from '@/models/EmailTemplate';

const DEFAULTS = [
  {
    seedKey: 'thank-you-catholic-mta',
    file: 'thu-cam-on-catholic-mta-georgia-italic.html',
    name: 'Thư cảm ơn Catholic MTA',
    replacements: [
      ['Huỳnh Hoàng Vũ', '{{tenHocSinh}}'],
      ['Huỳnh Phát', '{{tenPhuHuynh}}'],
      ['MTA-2026-0001', '{{maHoSo}}'],
      ['02/10/2026', '{{ngayTiepNhan}}'],
      ['hồ sơ du học Mỹ', 'hồ sơ du học {{quocGia}}'],
      ['>Mỹ<', '>{{quocGia}}<'],
      ['Hồ sơ du học Mỹ', 'Hồ sơ du học {{quocGia}}'],
    ],
  },
  {
    seedKey: 'progress-preview',
    file: 'xem-truoc.html',
    name: 'Cập nhật tiến độ hồ sơ',
    replacements: [
      ['[Tên học sinh]', '{{tenHocSinh}}'],
      ['[Tên trường]', '{{tenTruong}}'],
      ['[dd/mm/yyyy]', '{{ngayCapThu}}'],
    ],
  },
  {
    seedKey: 'interview-schedule',
    file: 'thong-bao-lich-phong-van.html',
    name: 'Thông báo lịch phỏng vấn',
    replacements: [
      ['Phan Anh Kiệt', '{{tenHocSinh}}'],
      ['19/10/2026', '{{ngayPhongVan}}'],
      ['10:30 sáng', '{{gioPhongVan}}'],
    ],
  },
  {
    seedKey: 'practice-schedule',
    file: 'thong-bao-lich-luyen-tap-phong-van.html',
    name: 'Lịch luyện tập phỏng vấn nội bộ 1-1',
    replacements: [],
  },
  {
    seedKey: 'offer-letter-congrats',
    file: 'thu-chuc-mung-nhan-offer-letter.html',
    name: 'Thư chúc mừng nhận Offer Letter từ trường',
    replacements: [],
  },
] as const;

function titleOf(html: string) {
  return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || 'Mẫu email Catholic MTA';
}

// Signature logo is the emblem; earlier seeded copies still point at logo.png.
const OLD_SIGNATURE_LOGO = '<img src="/email/logo.png" alt="Catholic MTA" width="180"';
const NEW_SIGNATURE_LOGO = '<img src="/email/emblem.png" alt="Catholic MTA" width="180"';

export async function ensureDefaultEmailTemplates() {
  const stale = await EmailTemplate.find({ html: { $regex: 'logo\\.png" alt="Catholic MTA" width="180"' } });
  for (const t of stale) {
    t.html = t.html.replaceAll(OLD_SIGNATURE_LOGO, NEW_SIGNATURE_LOGO);
    await t.save();
  }
  for (const item of DEFAULTS) {
    if (await EmailTemplate.exists({ seedKey: item.seedKey })) continue;
    try {
      let html = await readFile(path.join(process.cwd(), 'email-templates', item.file), 'utf8');
      for (const [from, to] of item.replacements) html = html.replaceAll(from, to);
      await EmailTemplate.updateOne(
        { seedKey: item.seedKey },
        { $setOnInsert: { seedKey: item.seedKey, name: item.name, subject: titleOf(html), html } },
        { upsert: true }
      );
    } catch (error) {
      console.warn(`Không thể nhập mẫu email ${item.file}`, error);
    }
  }
}
