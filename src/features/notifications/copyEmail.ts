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

async function inlineImages(html: string) {
  const srcs = [...new Set([...html.matchAll(/src="(\/email\/[\w-]+\.png)"/g)].map((m) => m[1]))];
  const data = new Map(await Promise.all(srcs.map(async (s) => [s, await toDataUrl(s)] as const)));
  return html.replace(/src="(\/email\/[\w-]+\.png)"/g, (_m, s: string) => `src="${data.get(s)}"`);
}

// Rich copy: paste keeps colours, layout and images. Plain text is the fallback flavour.
export async function copyEmailHtml(html: string, text: string) {
  const rich = await inlineImages(html);
  if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([rich], { type: 'text/html' }),
        'text/plain': new Blob([text], { type: 'text/plain' }),
      }),
    ]);
    return;
  }
  // Older browsers: copy a rendered selection of the HTML.
  const holder = document.createElement('div');
  holder.style.position = 'fixed';
  holder.style.left = '-99999px';
  holder.innerHTML = rich;
  document.body.appendChild(holder);
  const range = document.createRange();
  range.selectNodeContents(holder);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
  document.execCommand('copy');
  sel?.removeAllRanges();
  holder.remove();
}

export async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}
