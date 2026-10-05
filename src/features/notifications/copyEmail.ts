// Fallback when the system mailer is down: staff copy the rendered email and paste it into
// Gmail/Outlook themselves. Images are inlined as data URLs so they survive the paste even
// though /email/*.png lives on localhost (unreachable for the recipient).

async function toDataUrl(src: string) {
  const res = await fetch(src);
  if (!res.ok) throw new Error(`Không tải được ảnh ${src}`);
  const blob = await res.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

// NOTE: do NOT use /g flag on a module-level regex — it retains lastIndex across calls.
const IMG_SRC = /src="(\/email\/[\w-]+\.png)"/;   // no /g → safe for .test()
const IMG_SRC_G = /src="(\/email\/[\w-]+\.png)"/g; // /g used only inside functions

// Public https origin → Gmail fetches the images itself (same as received mail); base64 pasted into
// Gmail compose is often dropped. Localhost is unreachable for recipients, so it keeps data URIs.
function publicOrigin() {
  const o = window.location.origin;
  return /^https:\/\//.test(o) && !/localhost|127\.0\.0\.1/.test(o) ? o : null;
}

async function inlineImages(html: string) {
  const srcs = [...new Set([...html.matchAll(IMG_SRC_G)].map((m) => m[1]))];
  const data = new Map(await Promise.all(srcs.map(async (s) => [s, await toDataUrl(s)] as const)));
  return html.replace(IMG_SRC_G, (_m, s: string) => `src="${data.get(s)}"`);
}

// Paste targets take the <body>; drop <head>/<style> so editors don't show stray CSS text.
function bodyOnly(html: string) {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return m ? m[1] : html;
}

// Old-style copy of a rendered selection; works where the async clipboard API is blocked.
function copyViaSelection(html: string) {
  const holder = document.createElement('div');
  holder.contentEditable = 'true';
  holder.style.position = 'fixed';
  holder.style.left = '-99999px';
  holder.style.top = '0';
  holder.innerHTML = html;
  document.body.appendChild(holder);
  const range = document.createRange();
  range.selectNodeContents(holder);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
  const ok = document.execCommand('copy');
  sel?.removeAllRanges();
  holder.remove();
  if (!ok) throw new Error('Trình duyệt chặn copy. Hãy thử lại hoặc dùng Chrome/Edge.');
}

// Plain-text flavour built from the same HTML as the rich flavour, so both entry points
// (template page and send popup) always produce identical text: entities decoded, one line per row.
function htmlToPlain(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('style,script,head,img').forEach((n) => n.remove());
  doc.querySelectorAll('br').forEach((n) => n.replaceWith('\n'));
  doc.querySelectorAll('p,div,tr,table,h1,h2,h3,h4,h5,h6').forEach((n) => n.append('\n'));
  doc.querySelectorAll('td,th').forEach((n) => n.append(' '));
  return (doc.body.textContent ?? '')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Rich copy: paste keeps colours, layout and images. Plain text is the fallback flavour.
//
// Root-cause note: passing a deferred Promise<Blob> to ClipboardItem causes Chrome to write
// the clipboard TWICE (once synchronously with text/plain, once when resolved), causing double paste.
// Always await image inlining first so both blobs are synchronous.
export async function copyEmailHtml(html: string) {
  const body = bodyOnly(html);

  // Inline /email/*.png images as data URIs so they survive outside localhost.
  const origin = publicOrigin();
  const richHtml = !IMG_SRC.test(html)
    ? body
    : origin
      ? body.replace(IMG_SRC_G, (_m, s: string) => `src="${origin}${s}"`)
      : await inlineImages(body);

  if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write && window.isSecureContext) {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([richHtml], { type: 'text/html' }),
          'text/plain': new Blob([htmlToPlain(html)], { type: 'text/plain' }),
        }),
      ]);
      return;
    } catch {
      // fall through to the selection-based copy
    }
  }
  copyViaSelection(richHtml);
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-99999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    if (!ok) throw new Error('Trình duyệt chặn copy.');
  }
}
