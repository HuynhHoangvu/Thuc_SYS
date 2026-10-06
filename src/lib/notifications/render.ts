// Pure rendering helpers shared by the client preview and the server sender.
import { dropParentWording, isParentOptionalKey } from './parent-wording';
import { NOTIFY_FIELDS, countryKey, presetAppliesTo } from './templates';
import { countryLabel } from '@/lib/countries';
import { STRONG_STYLE, TEXT_TD_STYLE, letterCard, letterHead, letterSignature, letterSupport, letterTail } from './letter';

// Brand images live in public/email/. Sent mail embeds them inline (cid:<name>), so they show
// without a public URL; the web preview loads them from /email/<name>.png.
export const EMAIL_ASSETS = [
  'logo',
  'emblem',
  'ico-phone',
  'ico-mail',
  'ico-web',
  'ico-calendar',
  'ico-clock',
  'ico-video',
  'ico-users',
  'ico-clipboard',
  'ico-clipboard-orange',
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
      if (!vars[key]?.trim() && !isParentOptionalKey(key)) missing.add(key);
    }
  }
  return [...missing];
}

export function fillPlaceholders(text: string, vars: Record<string, string | undefined>) {
  const src = vars.tenPhuHuynh?.trim() ? text : dropParentWording(text);
  return src.replace(PLACEHOLDER, (raw, key: string) => {
    const value = vars[key]?.trim();
    return value ? formatVarValue(key, value) : raw;
  });
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Placement markers: a body line `[[HO_SO]]` puts the "Thông tin hồ sơ" card there and
// `[[LIEN_HE]]` puts the hotline/email box there. Without [[HO_SO]] the card leads the body;
// without [[LIEN_HE]] there is no box.
export const CARD_MARKER = '[[HO_SO]]';
export const SUPPORT_MARKER = '[[LIEN_HE]]';

// Visa outcome stages (pass / fail) are alternatives: show only the one reached,
// or a single neutral "Kết quả visa" step before the result is known.
const OUTCOME_PRESETS = new Set(['gd7a_dau_visa', 'gd7b_rot_visa']);

interface StepStage {
  key: string;
  title: string;
  emailTemplate?: { enabled: boolean; presetKey?: string | null } | null;
}

// Stage names mention the US letter (I-20); in emails for other countries use their letter instead.
const ADMISSION_LETTER: Record<string, string> = { Canada: 'LOA', NewZealand: 'Offer', Germany: 'Zulassung', France: 'Thư mời' };

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

// Body text inside the reference letter: paragraphs, bullets and checklists use the reference styles.
function inlineText(s: string) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, `<strong style="${STRONG_STYLE}">$1</strong>`)
    .replace(/\{\{\s*(\w+)\s*\}\}/g, '<span style="background:#fee2e2;color:#b91c1c;padding:0 3px;border-radius:3px">[$1]</span>');
}

function blockHtml(block: string, margin: number) {
  const lines = block.split('\n');
  const out: string[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      out.push(`<ul style="margin:6px 0px 0px;padding-left:22px">${list.join('')}</ul>`);
      list = [];
    }
  };
  for (const line of lines) {
    if (line.startsWith('- ')) list.push(`<li style="margin:0px 0px 4px">${inlineText(line.slice(2))}</li>`);
    else if (line.startsWith('☐ ')) {
      flush();
      out.push(`<div style="margin:2px 0px"><span style="display:inline-block;width:12px;height:12px;border:1.5px solid #f39422;border-radius:2px;margin-right:7px;vertical-align:-1px"></span>${inlineText(line.slice(2))}</div>`);
    } else {
      flush();
      out.push(`${out.length ? '<br>' : ''}${inlineText(line)}`);
    }
  }
  flush();
  return `<p style="margin:0px 0px ${margin}px;text-align:justify">${out.join('')}</p>`;
}

// Signature lines after "Trân trọng,": name, role, then phone and email.
function parseSignature(lines: string[]) {
  const [name = '', role = '', ...rest] = lines.map((l) => l.replace(/\*\*/g, '').trim()).filter(Boolean);
  const email = rest.find((l) => l.includes('@')) ?? '';
  const phone = rest.find((l) => l !== email && /\d/.test(l)) ?? '';
  return { name, role, phone, tel: phone.replace(/[^\d+]/g, ''), email };
}

// Lays the body out the way the reference letter does: text sections, the info card at [[HO_SO]],
// the hotline box right after the paragraph before [[LIEN_HE]], and the signature after "Trân trọng,".
function letterBody(body: string, img: (n: string) => string, info: Array<[string, string]>) {
  const text = body.includes(CARD_MARKER) ? body : `${CARD_MARKER}\n\n${body}`;
  const blocks = text.trim().split(/\n\s*\n/).map((b) => b.trim());
  const rows: string[] = [];
  let section: string[] = [];
  let first = true;
  let signature = '';

  const closeSection = (withSupport: boolean) => {
    if (!section.length && !withSupport) return;
    rows.push(
      `<tr><td style="padding:${first ? 38 : 26}px 40px 0px;${TEXT_TD_STYLE}">${section.join('')}${withSupport ? letterSupport() : ''}</td></tr>`
    );
    first = false;
    section = [];
  };

  blocks.forEach((block, i) => {
    const next = blocks[i + 1];
    if (block === CARD_MARKER) {
      closeSection(false);
      if (info.length) rows.push(letterCard(img, info));
      return;
    }
    if (block === SUPPORT_MARKER) {
      closeSection(true);
      return;
    }
    const lines = block.split('\n');
    if (/^Trân trọng,?$/.test(lines[0].trim())) {
      section.push(`<p style="margin:0px;text-align:justify">Trân trọng,</p>`);
      if (lines.length > 1) {
        const s = parseSignature(lines.slice(1));
        signature = letterSignature(img, s.name, s.role, s.phone, s.tel, s.email);
      }
      return;
    }
    // Spacing as in the reference: 14px before the hotline box, 24px before "Trân trọng,",
    // 0 at the end of a section, 16px otherwise.
    const margin =
      next === SUPPORT_MARKER ? 14 : next && /^Trân trọng/.test(next) ? 24 : !next || next === CARD_MARKER ? 0 : 16;
    section.push(blockHtml(block, margin));
  });
  closeSection(false);
  if (signature) rows.push(signature);
  return rows.join('');
}

export function renderEmailHtml(input: RenderEmailInput) {
  // Precomposed (NFC) characters render reliably across mail clients and fonts.
  const body = input.body.normalize('NFC');
  const img = (name: string) => assetSrc(name as EmailAsset, input.assetBase);
  const heading = escapeHtml(input.heading ?? '').replace(/\n/g, '<br>');
  const up = (t?: string) => (t ?? '').toLocaleUpperCase('vi-VN');
  const info = (input.info ?? []).filter(([, v]) => v?.trim()) as Array<[string, string]>;
  return `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only">
<title>${escapeHtml(input.subject.normalize('NFC'))}</title></head>
<body style="margin:0;padding:0;background-color:#e8eef7;font-family:'Segoe UI',Helvetica,Arial,sans-serif">
${letterHead(img, up(input.docLabel), input.caseCode ?? '', up(input.kicker), heading, up(input.eyebrow))}${letterBody(body, img, info)}${letterTail(img)}
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
