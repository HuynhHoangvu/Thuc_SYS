import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

dotenv.config({ path: '.env.local' });

const defaults = [
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
    name: 'Lịch thực hành phỏng vấn',
    replacements: [],
  },
  {
    seedKey: 'offer-letter-congrats',
    file: 'thu-chuc-mung-nhan-offer-letter.html',
    name: 'Thư chúc mừng nhận Offer Letter từ trường',
    replacements: [],
  },
  {
    seedKey: 'ds160-document-reminder',
    file: 'nhac-bo-sung-ho-so-ds160.html',
    name: 'Nhắc bổ sung hồ sơ DS-160',
    replacements: [],
  },
  {
    seedKey: 'school-application-submitted',
    file: 'cap-nhat-ho-so-da-nop-truong.html',
    name: 'Cập nhật hồ sơ đã nộp đến trường',
    replacements: [],
  },
];

async function main() {
  if (!process.argv.includes('--yes')) throw new Error('Add --yes to confirm updating the email template library.');
  const live = process.argv.includes('--live');
  const refresh = process.argv.includes('--refresh');
  const requestedKey = process.argv.find((arg) => arg.startsWith('--key='))?.slice('--key='.length);
  const selectedDefaults = requestedKey ? defaults.filter((item) => item.seedKey === requestedKey) : defaults;
  if (requestedKey && selectedDefaults.length === 0) throw new Error(`Unknown email template key: ${requestedKey}`);
  const uri = live ? process.env.ATLAS_DATABASE_URL : process.env.DATABASE_URL;
  if (!uri) throw new Error(`${live ? 'ATLAS_DATABASE_URL' : 'DATABASE_URL'} is not set.`);

  const client = new MongoClient(uri);
  await client.connect();
  try {
    const collection = client.db('thucsys').collection('emailtemplates');
    for (const item of selectedDefaults) {
      let html = await readFile(path.join(process.cwd(), 'email-templates', item.file), 'utf8');
      for (const [from, to] of item.replacements) html = html.replaceAll(from, to);
      const subject = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || 'Mẫu email Catholic MTA';
      const values = { seedKey: item.seedKey, name: item.name, subject, html, updatedAt: new Date() };
      await collection.updateOne(
        { seedKey: item.seedKey },
        refresh
          ? { $set: values, $setOnInsert: { createdAt: new Date() } }
          : { $setOnInsert: { ...values, createdAt: new Date() } },
        { upsert: true }
      );
    }

    const saved = await collection
      .find({ seedKey: { $in: selectedDefaults.map((item) => item.seedKey) } })
      .project({ seedKey: 1, name: 1, html: 1 })
      .toArray();
    for (const template of saved) {
      const html = String(template.html);
      const countryVariables = html.match(/\{\{quocGia\}\}/g)?.length ?? 0;
      console.log(`${template.seedKey}: ${template.name} (${html.length} bytes, ${countryVariables} biến quốc gia)`);
    }
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
