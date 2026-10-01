// Pure rendering helpers shared by the client preview and the server sender.
import { NOTIFY_FIELDS, countryKey, presetAppliesTo } from './templates';
import { countryLabel } from '@/lib/countries';

// Brand images live in public/email/. Sent mail embeds them inline (cid:<name>), so they show
// without a public URL; the web preview loads them from /email/<name>.png.
export const EMAIL_ASSETS = [
  'logo',
  'emblem',
  'ico-phone',
  'ico-mail',
  'ico-web',
  'facebook',
  'youtube',
  'instagram',
  'tiktok',
  'x',
  'threads',
] as const;
export type EmailAsset = (typeof EMAIL_ASSETS)[number];

// assetBase: undefined → same-origin "/email" folder (web preview); "cid:" → inline attachment;
// otherwise the public folder URL holding the PNGs, e.g. "https://catholicmta.edu.vn/email-assets".
function assetSrc(name: EmailAsset, assetBase?: string) {
  if (assetBase === 'cid:') return `cid:${name}`;
  return `${(assetBase ?? '/email').replace(/\/$/, '')}/${name}.png`;
}

export const AUTO_EMAIL_NOTE = 'Đây là thư tự động gửi từ chúng tôi. Quý khách vui lòng không phản hồi lại thư này.';

const PLACEHOLDER = /\{\{\s*(\w+)\s*\}\}/g;

const fieldTypes = new Map<string, string>([...NOTIFY_FIELDS.map((f) => [f.key, f.type] as const), ['ngayGui', 'date']]);

function pad(n: number) {
  return String(n).padStart(2, '0');
}

// Date inputs give "YYYY-MM-DD" / "YYYY-MM-DDTHH:mm"; emails show Vietnamese format.
export function formatVarValue(key: string, value: string) {
  const type = fieldTypes.get(key);
  if (type === 'date') {
    const m = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return `${m[3]}/${m[2]}/${m[1]}`;
  }
  if (type === 'datetime-local') {
    const m = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (m) return `${m[4]}:${m[5]} ngày ${m[3]}/${m[2]}/${m[1]}`;
  }
  return value;
}

export function toDateInputValue(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function findMissingVars(texts: string[], vars: Record<string, string | undefined>) {
  const missing = new Set<string>();
  for (const text of texts) {
    for (const [, key] of text.matchAll(PLACEHOLDER)) {
      if (!vars[key]?.trim()) missing.add(key);
    }
  }
  return [...missing];
}

export function fillPlaceholders(text: string, vars: Record<string, string | undefined>) {
  return text.replace(PLACEHOLDER, (raw, key: string) => {
    const value = vars[key]?.trim();
    return value ? formatVarValue(key, value) : raw;
  });
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Brand palette from the Catholic MTA email design (logo navy + logo orange).
const DEEP = '#0f2f6b';
const INK = '#14305f';
const NAVY = '#1b4f9c';
const ORANGE = '#f39422';
const LABEL = '#9a8f80';
const MUTED = '#7a8499';
const TEXT = '#2b2f36';
const FONT = "'Segoe UI',Helvetica,Arial,sans-serif";
// Georgia renders Vietnamese diacritics detached on Windows, so Times New Roman leads the serif stack.
const SERIF = "'Times New Roman',Times,Georgia,serif";
const COMPANY_FULL = 'CÔNG TY TNHH TƯ VẤN DU HỌC CATHOLIC MTA';

function splitBar(height: number, left = 55) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td width="${left}%" style="height:${height}px;background-color:${NAVY};font-size:0;line-height:0">&nbsp;</td><td width="${100 - left}%" style="height:${height}px;background-color:${ORANGE};font-size:0;line-height:0">&nbsp;</td></tr></table>`;
}

function inline(s: string) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, `<strong style="color:${INK}">$1</strong>`)
    .replace(/\{\{\s*(\w+)\s*\}\}/g, '<span style="background:#fee2e2;color:#b91c1c;padding:0 3px;border-radius:3px">[$1]</span>');
}

const P_STYLE = `margin:0 0 12px;font-family:${FONT};font-size:14px;line-height:21px;color:${TEXT}`;

// "Trân trọng,\nName\nRole[\nCompany]" becomes the signature: emblem | name + role.
// The company line is dropped here because the footer already names the company.
// Signature block, from the staff signature design (chu-ky-ho-thi-doan-thuc.html).
// Body lines after "Trân trọng,": name, role, then optional phone and email lines.
const SIG_WEBSITE = 'catholicmta.edu.vn';

function signatureBlock(lines: string[], assetBase?: string) {
  const [name, role, ...rest] = lines.map((l) => l.replace(/\*\*/g, '').trim()).filter(Boolean);
  const email = rest.find((l) => l.includes('@'));
  const phone = rest.find((l) => l !== email && /\d/.test(l));
  // Icon and text sit in separate cells so mail apps that ignore white-space:nowrap (Gmail iOS)
  // can't push the text below the icon.
  const row = (icon: EmailAsset, alt: string, href: string, text: string, color = '#333333') =>
    `<tr><td valign="middle" width="20" style="width:20px;padding:2px 0"><img src="${assetSrc(icon, assetBase)}" alt="${alt}" width="14" height="14" style="display:block;border:0;width:14px;height:14px"></td><td valign="middle" style="padding:2px 0;font-family:${FONT};font-size:12px;line-height:18px"><a href="${escapeHtml(href)}" style="color:${color};text-decoration:none">${escapeHtml(text)}</a></td></tr>`;

  return `<div style="${P_STYLE};margin-bottom:18px">Trân trọng,</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:${FONT};color:#333333;margin:0 0 8px;max-width:400px">
  <tr>
    <td valign="middle" width="26%" style="width:26%;padding:4px 12px 4px 0">
      <img src="${assetSrc('emblem', assetBase)}" alt="Catholic MTA" width="96" style="display:block;border:0;width:100%;max-width:96px;height:auto">
    </td>
    <td valign="middle" style="padding:2px 0 2px 12px;border-left:2px solid ${ORANGE};white-space:nowrap">
      ${name ? `<div style="font-family:${FONT};font-size:16px;line-height:21px;font-weight:bold;color:${NAVY}">${escapeHtml(name)}</div>` : ''}
      ${role ? `<div style="font-family:${FONT};font-size:12px;line-height:18px;font-weight:bold;color:${ORANGE};padding-bottom:4px">${escapeHtml(role)}</div>` : ''}
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      ${phone ? row('ico-phone', 'Điện thoại', `tel:${phone.replace(/[^\d+]/g, '')}`, phone) : ''}
      ${email ? row('ico-mail', 'Thư điện tử', `mailto:${email}`, email) : ''}
      ${row('ico-web', 'Trang web', `https://${SIG_WEBSITE}`, SIG_WEBSITE, NAVY)}
      </table>
    </td>
  </tr>
</table>`;
}

function renderSingleBlock(block: string, assetBase?: string) {
  const lines = block.split('\n');
  if (/^Trân trọng,?\s*$/.test(lines[0].trim()) && lines.length > 1) {
    return signatureBlock(lines.slice(1), assetBase);
  }
  const out: string[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      out.push(`<ul style="margin:4px 0 0;padding-left:20px">${list.join('')}</ul>`);
      list = [];
    }
  };
  for (const line of lines) {
    if (line.startsWith('- ')) {
      list.push(`<li style="margin:0 0 3px">${inline(line.slice(2))}</li>`);
    } else if (line.startsWith('☐ ')) {
      flush();
      out.push(`<div style="margin:2px 0">&#9744; ${inline(line.slice(2))}</div>`);
    } else {
      flush();
      out.push(`${out.length ? '<br>' : ''}${inline(line)}`);
    }
  }
  flush();
  return `<div style="${P_STYLE}">${out.join('')}</div>`;
}

function bodyToHtml(body: string, assetBase?: string) {
  return body
    .trim()
    .split(/\n\s*\n/)
    .map((block) => renderSingleBlock(block, assetBase))
    .join('');
}

// Placement markers: a body line `[[HO_SO]]` puts the "Thông tin hồ sơ" card there and
// `[[LIEN_HE]]` puts the hotline/email box there. Without [[HO_SO]] the card leads the body;
// without [[LIEN_HE]] there is no box.
export const CARD_MARKER = '[[HO_SO]]';
export const SUPPORT_MARKER = '[[LIEN_HE]]';

function renderBodyAndCard(body: string, assetBase?: string, info?: Array<[string, string | undefined]>) {
  const card = infoCard(info ?? []);
  const text = body.includes(CARD_MARKER) ? body : `${CARD_MARKER}\n\n${body}`;
  const rows: string[] = [];
  let first = true;
  for (const part of text.split(/(\[\[HO_SO\]\]|\[\[LIEN_HE\]\])/)) {
    if (part === CARD_MARKER) {
      if (card) rows.push(card);
    } else if (part === SUPPORT_MARKER) {
      rows.push(supportBox());
    } else if (part.trim()) {
      rows.push(
        `<tr><td class="px" style="padding:${first ? 32 : 20}px 7% 0;font-family:${FONT};font-size:14px;line-height:24px;color:${TEXT}">
${bodyToHtml(part, assetBase)}
</td></tr>`
      );
    } else {
      continue;
    }
    first = false;
  }
  return rows.join('\n');
}

// Visa outcome stages (pass / fail) are alternatives: show only the one reached,
// or a single neutral "Kết quả visa" step before the result is known.
const OUTCOME_PRESETS = new Set(['gd7a_dau_visa', 'gd7b_rot_visa']);

interface StepStage {
  key: string;
  title: string;
  emailTemplate?: { enabled: boolean; presetKey?: string | null } | null;
}

// Stage names mention the US letter (I-20); in emails for other countries use their letter instead.
const ADMISSION_LETTER: Record<string, string> = { Canada: 'LOA', NewZealand: 'Offer' };

export function localizeStageTitle(title: string, country?: string | null) {
  const letter = ADMISSION_LETTER[countryKey(country) ?? ''];
  return letter ? title.replace(/I-20/g, letter) : title;
}

export function buildProgressSteps(stages: StepStage[], currentKey: string, country?: string | null) {
  const steps: Array<{ key: string; title: string }> = [];
  let outcomeAdded = false;
  for (const s of stages) {
    if (!s.emailTemplate?.enabled) continue;
    if (!presetAppliesTo(s.emailTemplate.presetKey, country)) continue;
    const isOutcome = OUTCOME_PRESETS.has(s.emailTemplate.presetKey ?? '');
    if (!isOutcome) {
      steps.push({ key: s.key, title: localizeStageTitle(s.title, country) });
      continue;
    }
    const currentIsOutcome = stages.some(
      (x) => x.key === currentKey && OUTCOME_PRESETS.has(x.emailTemplate?.presetKey ?? '')
    );
    if (currentIsOutcome) {
      if (s.key === currentKey) steps.push({ key: s.key, title: s.title });
    } else if (!outcomeAdded) {
      steps.push({ key: '__outcome', title: 'Kết quả visa' });
      outcomeAdded = true;
    }
  }
  return { steps: steps.map((s) => s.title), currentIndex: steps.findIndex((s) => s.key === currentKey) };
}


export interface RenderEmailInput {
  subject: string;
  body: string;
  steps: string[];
  currentIndex: number;
  // Big hero title, e.g. the stage name (or the thank-you line for GĐ1).
  heading?: string;
  // Hero line under the title, e.g. "DỊCH VỤ HỒ SƠ DU HỌC NEW ZEALAND".
  eyebrow?: string;
  // Small orange line above the hero title and the letterhead label; see letterLabels().
  kicker?: string;
  docLabel?: string;
  caseCode?: string;
  // "Thông tin hồ sơ" card rows; empty values are skipped.
  info?: Array<[label: string, value: string | undefined]>;
  companyName?: string;
  // Where images load from; see assetSrc.
  assetBase?: string;
  unsubscribeUrl?: string;
}

// Letter framing per preset: letterhead label, hero kicker, and (GĐ1) the thank-you title.
export function letterLabels(presetKey?: string | null): { docLabel: string; kicker: string; heading?: string } {
  switch (presetKey) {
    case 'gd1_hop_dong':
      return { docLabel: 'Thư cảm ơn', kicker: 'Lời tri ân', heading: 'Cảm ơn Quý khách\nđã tin tưởng lựa chọn' };
    case 'gd7a_dau_visa':
      return { docLabel: 'Thư chúc mừng', kicker: 'Chúc mừng' };
    case 'gd7b_rot_visa':
      return { docLabel: 'Kết quả visa', kicker: 'Thông báo kết quả' };
    case 'gd6_nhac_pv':
      return { docLabel: 'Nhắc lịch', kicker: 'Nhắc lịch phỏng vấn' };
    default:
      return { docLabel: 'Cập nhật hồ sơ', kicker: 'Cập nhật tiến độ' };
  }
}

function infoCard(rows: Array<[string, string | undefined]>) {
  const filled = rows.filter(([, v]) => v?.trim());
  if (!filled.length) return '';
  const trs = filled
    .map(([label, value], i) => {
      const border = i < filled.length - 1 ? 'border-bottom:1px solid #f0e2cf;' : '';
      const valueStyle = i < 2 ? `color:${INK};font-weight:bold;` : `color:${TEXT};`;
      return `<tr><td width="36%" style="padding:9px 0;color:${LABEL};${border}">${escapeHtml(label)}</td><td style="padding:9px 0;${valueStyle}${border}">${escapeHtml(value!)}</td></tr>`;
    })
    .join('');
  return `<tr><td class="px" style="padding:28px 7% 0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff8ef;border:1px solid #f0e2cf">
<tr><td style="font-size:0;line-height:0">${splitBar(4)}</td></tr>
<tr><td style="padding:20px 28px 22px">
<div style="font-family:${FONT};font-size:11px;letter-spacing:3px;font-weight:bold;color:${NAVY};margin-bottom:8px">THÔNG TIN HỒ SƠ</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:${FONT};font-size:13px;line-height:20px">${trs}</table>
</td></tr></table>
</td></tr>`;
}

// Company hotline / mailbox shown in the support box, and footer contact + offices.
const SUPPORT = { phone: '(+84) 909 841 722', tel: '+84909841722', email: 'admin@mtacorporation.com' };
const FOOTER_CONTACT: Array<{ icon: EmailAsset; alt: string; html: string }> = [
  { icon: 'ico-phone', alt: 'Điện thoại', html: '0909 451 822 &ndash; 0902 968 652' },
  { icon: 'ico-mail', alt: 'Thư điện tử', html: '<a href="mailto:info@mtacorporation.com" style="color:#d5e4fa;text-decoration:underline">info@mtacorporation.com</a>' },
  { icon: 'ico-web', alt: 'Trang web', html: '<a href="https://catholicmta.edu.vn" style="color:#d5e4fa;text-decoration:underline">catholicmta.edu.vn</a>' },
];
const FOOTER_OFFICES: Array<[string, string]> = [
  ['Việt Nam', '45 Đinh Tiên Hoàng, Phường Sài Gòn, TP.HCM'],
  ['Hoa Kỳ', '8107 Bolsa Ave, Midway City, CA 92655'],
  ['Canada', '110 James St. Suite 200, St. Catharines, ON L2R 7E8, CA'],
];
// Company social pages.
const SOCIAL_LINKS: Array<{ name: string; href: string; icon: EmailAsset }> = [
  { name: 'Facebook', href: 'https://www.facebook.com/duhoccatholicmta', icon: 'facebook' },
  { name: 'YouTube', href: 'https://www.youtube.com/@duhoccatholicmta', icon: 'youtube' },
  { name: 'Instagram', href: 'https://www.instagram.com/duhoc_catholicmta', icon: 'instagram' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@catholicmta', icon: 'tiktok' },
  { name: 'X', href: 'https://x.com/DHCATHOLICMTA', icon: 'x' },
  { name: 'Threads', href: 'https://www.threads.com/@duhoc_catholicmta', icon: 'threads' },
];

function supportBox() {
  // Two inline-blocks: side by side when there is room, stacked on narrow screens.
  const item = (label: string, href: string, text: string, max: number) =>
    `<div style="display:inline-block;vertical-align:top;width:100%;max-width:${max}px;font-family:${FONT}"><div style="padding:12px 16px"><div style="font-size:10px;line-height:14px;letter-spacing:1.5px;color:${ORANGE};font-weight:bold">${label}</div><a href="${href}" style="font-size:14px;line-height:21px;color:${INK};font-weight:bold;text-decoration:none;white-space:nowrap">${text}</a></div></div>`;
  return `<tr><td class="px" style="padding:0 7%">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5fb;border-left:4px solid ${ORANGE}"><tr><td style="font-size:0;line-height:0">
${item('ĐƯỜNG DÂY NÓNG', `tel:${SUPPORT.tel}`, SUPPORT.phone, 200)}${item('THƯ ĐIỆN TỬ', `mailto:${SUPPORT.email}`, SUPPORT.email, 260)}
</td></tr></table>
</td></tr>`;
}

function footer(assetBase?: string) {
  const contact = FOOTER_CONTACT.map(
    (c, i) =>
      `<div style="padding-bottom:${i < FOOTER_CONTACT.length - 1 ? 6 : 0}px"><img src="${assetSrc(c.icon, assetBase)}" alt="${c.alt}" width="16" height="16" style="display:inline-block;vertical-align:middle;border:0;width:16px;height:16px;margin:0 9px 0 0">${c.html}</div>`
  ).join('');
  const offices = FOOTER_OFFICES.map(
    ([k, v], i) =>
      `<div style="padding-bottom:${i < FOOTER_OFFICES.length - 1 ? 4 : 0}px"><strong style="color:${ORANGE}">${k}:</strong> ${escapeHtml(v)}</div>`
  ).join('');
  const icons = SOCIAL_LINKS.map(
    (l) =>
      `<a href="${l.href}" target="_blank" title="${l.name} Catholic MTA" style="text-decoration:none;display:inline-block;margin:0 4px 8px"><img src="${assetSrc(l.icon, assetBase)}" alt="${l.name}" width="40" height="40" style="display:block;border:0;width:40px;height:40px;border-radius:9px"></a>`
  ).join('');
  const sep = ` <span style="color:${ORANGE};padding:0 8px">&bull;</span> `;
  const links = SOCIAL_LINKS.map(
    (l) => `<a href="${l.href}" target="_blank" style="color:#ffffff;text-decoration:none;font-weight:bold;white-space:nowrap">${l.name}</a>`
  ).join(sep);
  return `<tr><td class="px" bgcolor="${DEEP}" style="background-color:${DEEP};padding:34px 7% 0">
<div style="font-family:${FONT};font-size:11px;letter-spacing:2px;font-weight:bold;color:#ffffff;padding-bottom:14px">${COMPANY_FULL}</div>
<div style="font-size:0;line-height:0">
<div style="display:inline-block;vertical-align:top;width:100%;max-width:230px;font-family:${FONT};font-size:12px;line-height:20px;color:#c9d8f0;padding-bottom:14px">${contact}</div><div style="display:inline-block;vertical-align:top;width:100%;max-width:260px;font-family:${FONT};font-size:12px;line-height:20px;color:#c9d8f0">${offices}</div>
</div>
</td></tr>
<tr><td align="center" class="px" bgcolor="${DEEP}" style="background-color:${DEEP};padding:32px 6% 0">
<div style="font-family:${FONT};font-size:10px;letter-spacing:3px;color:#9fb8e0;font-weight:bold;padding-bottom:12px">HÃY KẾT NỐI CÙNG CHÚNG TÔI</div>
${icons}
</td></tr>
<tr><td align="center" class="px" bgcolor="${DEEP}" style="background-color:${DEEP};padding:8px 5% 32px;font-family:${FONT};font-size:12px;line-height:24px">${links}</td></tr>`;
}

export function renderEmailHtml(input: RenderEmailInput) {
  // Precomposed (NFC) characters render reliably across mail clients and fonts.
  input = { ...input, subject: input.subject.normalize('NFC'), body: input.body.normalize('NFC') };
  const company = input.companyName ?? 'Catholic MTA';
  const headingHtml = input.heading ? escapeHtml(input.heading).replace(/\n/g, '<br>') : '';
  const unsubscribe = input.unsubscribeUrl
    ? `<div style="margin-top:8px;font-size:11px"><a href="${escapeHtml(input.unsubscribeUrl)}" style="color:${MUTED}">Ngừng nhận thông báo</a></div>`
    : '';
  return `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only">
<title>${escapeHtml(input.subject)}</title>
<style>
:root{color-scheme:light only;supported-color-schemes:light only}
body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}
@media only screen and (max-width:520px){
  .px{padding-left:18px !important;padding-right:18px !important}
  .h1{font-size:26px !important;line-height:35px !important}
}
</style></head>
<body style="margin:0;padding:0;background-color:#e8eef7;font-family:${FONT};color:${TEXT}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e8eef7"><tr><td align="center" style="padding:30px 12px">
<table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:620px;background-color:#ffffff;box-shadow:0 6px 28px rgba(15,47,107,0.14)">

<tr><td class="px" style="padding:24px 6% 20px;font-size:0;line-height:0">
<div style="display:inline-block;vertical-align:middle;width:100%;max-width:290px;font-size:14px;line-height:normal"><img src="${assetSrc('logo', input.assetBase)}" alt="${escapeHtml(company)} - Yêu thương, Trách nhiệm, Tương trợ" width="270" style="display:block;border:0;width:270px;max-width:100%;height:auto"></div>
<div style="display:inline-block;vertical-align:middle;width:100%;max-width:240px;font-size:14px;line-height:normal;text-align:right;padding-top:8px">
${input.docLabel ? `<div style="font-family:${FONT};font-size:11px;letter-spacing:4px;font-weight:bold;color:${ORANGE}">${escapeHtml(input.docLabel.toUpperCase())}</div>` : ''}
${input.caseCode ? `<div style="font-family:${FONT};font-size:12px;color:${MUTED};padding-top:5px">Mã hồ sơ&nbsp; <strong style="color:${NAVY};letter-spacing:1px">${escapeHtml(input.caseCode)}</strong></div>` : ''}
</div>
</td></tr>

<tr><td align="center" class="px" bgcolor="${NAVY}" style="background-color:${NAVY};background-image:linear-gradient(135deg,${DEEP} 0%,${NAVY} 62%,#2f6cc0 100%);padding:46px 6% 44px">
${input.kicker ? `<div style="font-family:${FONT};font-size:11px;letter-spacing:6px;color:${ORANGE};font-weight:bold">${escapeHtml(input.kicker.toUpperCase())}</div>` : ''}
${headingHtml ? `<h1 class="h1" style="margin:18px 0 0;font-family:${SERIF};font-size:30px;line-height:40px;font-weight:normal;color:#ffffff">${headingHtml}</h1>` : ''}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px auto 0"><tr>
<td valign="middle" style="width:56px;font-size:0;line-height:0"><div style="height:1px;background-color:${ORANGE};font-size:0;line-height:0">&nbsp;</div></td>
<td style="padding:0 12px;font-size:11px;line-height:11px;color:${ORANGE};font-family:${FONT}">&bull;</td>
<td valign="middle" style="width:56px;font-size:0;line-height:0"><div style="height:1px;background-color:${ORANGE};font-size:0;line-height:0">&nbsp;</div></td>
</tr></table>
${input.eyebrow ? `<div style="margin-top:20px;font-family:${FONT};font-size:12px;letter-spacing:3px;color:#d6e4f8;font-weight:bold">${escapeHtml(input.eyebrow.toUpperCase())}</div>` : ''}
</td></tr>
<tr><td style="height:5px;background-color:${ORANGE};font-size:0;line-height:0">&nbsp;</td></tr>

${renderBodyAndCard(input.body, input.assetBase, input.info)}

<!-- NO-REPLY NOTICE -->
<tr><td class="px" align="center" style="padding:36px 5% 38px;font-family:${FONT};font-size:12px;line-height:24px">
<span style="background-color:#fff3a3;color:${INK};font-weight:bold;font-style:italic;padding:3px 6px"><b><i>${AUTO_EMAIL_NOTE}</i></b></span>
${unsubscribe}
</td></tr>

${footer(input.assetBase)}
<tr><td>${splitBar(10)}</td></tr>
</table></td></tr></table>
</body></html>`;
}

export function eyebrowFor(country?: string) {
  const name = countryLabel(country);
  return `Dịch vụ hồ sơ du học${name ? ` ${name}` : ''}`;
}

// Stage titles look like "GĐ1 · Ký HĐ & thu thập giấy tờ"; the email heading drops the "GĐ1 · " prefix.
export function headingFromStageTitle(title?: string, country?: string | null) {
  return (title ? localizeStageTitle(title, country) : undefined)?.replace(/^GĐ\s*\d+[A-Z]?\s*·\s*/i, '').trim() || undefined;
}

export function buildInfoRows(vars: Record<string, string | undefined>, country?: string) {
  return [
    ['Mã hồ sơ', vars.maHoSo],
    ['Học viên', vars.tenHocSinh],
    ['Phụ huynh', vars.tenPhuHuynh],
    ['Quốc gia', countryLabel(country) || undefined],
    ['Dịch vụ', `Hồ sơ du học${countryLabel(country) ? ` ${countryLabel(country)}` : ''}`],
    ['Ngày tiếp nhận', vars.ngayKyHopDong ? formatVarValue('ngayKyHopDong', vars.ngayKyHopDong) : undefined],
  ] as Array<[string, string | undefined]>;
}

export function renderEmailText(body: string) {
  return `${body.replace(/\[\[(HO_SO|LIEN_HE)\]\]\n*/g, '').replace(/\*\*(.+?)\*\*/g, '$1').trim()}\n\n---\n${AUTO_EMAIL_NOTE}\n`;
}
