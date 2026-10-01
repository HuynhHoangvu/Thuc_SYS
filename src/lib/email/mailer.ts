import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Resend } from 'resend';
import { EMAIL_ASSETS } from '@/lib/notifications/render';

export interface MailInput {
  to: string;
  cc?: string[];
  subject: string;
  html: string;
  text: string;
  // Same value for every mail about one student so mail clients group them into a thread.
  threadId?: string;
  unsubscribeUrl?: string;
}

export interface MailResult {
  providerId: string;
  testMode: boolean;
}

// When MAIL_TEST_RECIPIENT is set every mail goes there instead of the real customer.
function applyTestMode(input: MailInput): MailInput & { testMode: boolean } {
  const testRecipient = process.env.MAIL_TEST_RECIPIENT?.trim();
  if (!testRecipient) return { ...input, testMode: false };
  return { ...input, to: testRecipient, cc: [], subject: `[TEST] ${input.subject}`, testMode: true };
}

// Images referenced as cid:<name> are attached inline from public/email/<name>.png.
// Every cid: reference gets its own attachment (logo-1, ico-phone-1, ico-phone-2…): Gmail's
// mobile apps drop images at random when one inline attachment is referenced more than once.
async function inlineImages(html: string) {
  const files = new Map<string, Buffer>();
  const attachments: Array<{ filename: string; content: Buffer; contentId: string }> = [];
  const counts = new Map<string, number>();
  const known = new Set<string>(EMAIL_ASSETS);
  let out = html;
  for (const match of html.matchAll(/cid:([\w-]+)/g)) {
    const name = match[1];
    if (!known.has(name)) continue;
    const n = (counts.get(name) ?? 0) + 1;
    counts.set(name, n);
    const id = `${name}-${n}`;
    if (!files.has(name)) files.set(name, await readFile(path.join(process.cwd(), 'public', 'email', `${name}.png`)));
    attachments.push({ filename: `${id}.png`, content: files.get(name)!, contentId: id });
    out = out.replace(`cid:${name}"`, `cid:${id}"`);
  }
  return { html: out, attachments };
}

export async function sendMail(raw: MailInput): Promise<MailResult> {
  const input = applyTestMode(raw);
  const apiKey = process.env.RESEND_API_KEY?.trim();

  // No provider configured (local dev): write the mail to disk so it can be opened in a browser.
  if (!apiKey) {
    const dir = path.join(process.cwd(), '.mail-outbox');
    await mkdir(dir, { recursive: true });
    const id = `${Date.now()}-${input.to.replace(/[^a-z0-9]+/gi, '_')}`;
    const header = `<!-- To: ${input.to} | CC: ${(input.cc ?? []).join(', ')} | Subject: ${input.subject} -->\n`;
    const localHtml = input.html.replace(/cid:([\w-]+)/g, (_m, name) =>
      `file:///${path.join(process.cwd(), 'public', 'email', `${name}.png`).replace(/\\/g, '/')}`
    );
    await writeFile(path.join(dir, `${id}.html`), header + localHtml, 'utf8');
    return { providerId: `outbox:${id}`, testMode: input.testMode };
  }

  const resend = new Resend(apiKey);
  const from = process.env.MAIL_FROM ?? 'Catholic MTA <onboarding@resend.dev>';
  const headers: Record<string, string> = {};
  if (input.threadId) {
    headers.References = `<${input.threadId}@thucsys>`;
    headers['In-Reply-To'] = `<${input.threadId}@thucsys>`;
  }
  if (input.unsubscribeUrl) headers['List-Unsubscribe'] = `<${input.unsubscribeUrl}>`;
  const inline = await inlineImages(input.html);
  const { data, error } = await resend.emails.send({
    from,
    to: input.to,
    cc: input.cc?.length ? input.cc : undefined,
    subject: input.subject,
    html: inline.html,
    text: input.text,
    headers,
    attachments: inline.attachments,
  });
  if (error || !data) throw new Error(error?.message ?? 'Resend did not return an id');
  return { providerId: data.id, testMode: input.testMode };
}
