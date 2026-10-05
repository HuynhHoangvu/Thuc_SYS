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

const IMG_SRC = /src="(\/email\/[\w-]+\.png)"/g;

async function inlineImages(html: string) {
  const srcs = [...new Set([...html.matchAll(IMG_SRC)].map((m) => m[1]))];
  const data = new Map(await Promise.all(srcs.map(async (s) => [s, await toDataUrl(s)] as const)));
  return html.replace(IMG_SRC, (_m, s: string) => `src="${data.get(s)}"`);
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
  holder.style.width = '640px';
  holder.style.background = '#ffffff';
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

// Outlook's paste filter drops "color" set in style="" on divs, cells and links, so text on the dark
// footer turns black. A <font color> wrapper survives, so mirror every inline text colour onto one.
function outlookSafe(html: string) {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  doc.body.querySelectorAll<HTMLElement>('[style*="color"]').forEach((el) => {
    const color = el.style.color;
    if (!color || !el.firstChild || el.tagName === 'TABLE' || el.tagName === 'TR' || el.tagName === 'IMG') return;
    if (el.firstElementChild?.tagName === 'FONT' && el.children.length === 1) return;
    const font = doc.createElement('font');
    font.setAttribute('color', color);
    while (el.firstChild) font.appendChild(el.firstChild);
    el.appendChild(font);
  });
  return doc.body.innerHTML;
}

// Rich copy: paste keeps colours, layout and images. Plain text is the fallback flavour.
// Must be called directly from the click handler: browsers only allow clipboard writes during
// the user gesture, so the write starts immediately with *promised* blobs (images load after).
export async function copyEmailHtml(html: string, text: string) {
  // Copying a rendered selection (like Ctrl+C on the page) makes Chrome write every computed style
  // (font, size, colour) inline, which Outlook's paste keeps far better than a raw HTML blob.
  // Only possible while the click gesture is fresh, i.e. when no image has to be fetched first.
  if (!IMG_SRC.test(html)) {
    IMG_SRC.lastIndex = 0;
    try {
      copyViaSelection(bodyOnly(html));
      return;
    } catch {
      // fall through to the clipboard API
    }
  }
  IMG_SRC.lastIndex = 0;
  const richPromise = inlineImages(bodyOnly(html)).then(outlookSafe);
  if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write && window.isSecureContext) {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': richPromise.then((r) => new Blob([r], { type: 'text/html' })),
          'text/plain': new Blob([text], { type: 'text/plain' }),
        }),
      ]);
      return;
    } catch {
      // fall through to the selection-based copy
    }
  }
  copyViaSelection(await richPromise);
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
