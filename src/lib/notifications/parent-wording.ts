// Parent name is optional: when staff leave it blank the letter addresses the student alone
// ("Kính gửi em X") and the parent row/mentions disappear instead of blocking the send.

const PARENT_KEY = 'tenPhuHuynh';

export function isParentOptionalKey(key: string) {
  return key === PARENT_KEY;
}

// Rewrites parent wording in HTML, plain text or **markdown** text. Call only when the name is empty.
export function dropParentWording(text: string) {
  return text
    // "Quý phụ huynh {{tenPhuHuynh}} và em" (optionally wrapped in <strong>/**)
    .replace(/Quý\s+phụ huynh\s*(?:<[^>]+>|\*\*)?\s*\{\{\s*tenPhuHuynh\s*\}\}\s*(?:<\/[^>]+>|\*\*)?\s*và em/gi, 'em')
    .replace(/(?:Quý\s+phụ huynh|gia đình)\s+và em/gi, 'em')
    .replace(/Quý\s+phụ huynh/gi, 'Quý khách')
    // info-table row "Phụ huynh | {{tenPhuHuynh}}" (innermost <tr> only)
    .replace(/<tr\b[^>]*>(?:(?!<tr\b|<\/tr>)[\s\S])*?\{\{\s*tenPhuHuynh\s*\}\}(?:(?!<tr\b|<\/tr>)[\s\S])*<\/tr>\s*/gi, '');
}
