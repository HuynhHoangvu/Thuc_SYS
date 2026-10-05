// Parent name is optional: when staff leave it blank the letter addresses the student alone
// ("Kính gửi Quý phụ huynh và em X") and the parent name/row disappear instead of blocking the send.

const PARENT_KEY = 'tenPhuHuynh';

export function isParentOptionalKey(key: string) {
  return key === PARENT_KEY;
}

// Rewrites parent wording in HTML, plain text or **markdown** text. Call only when the name is empty.
export function dropParentWording(text: string) {
  return text
    // "Quý phụ huynh {{tenPhuHuynh}} và em" → "Quý phụ huynh và em" (optionally wrapped in <strong>/**)
    .replace(/(Quý\s+phụ huynh)\s*(?:<[^>]+>|\*\*)?\s*\{\{\s*tenPhuHuynh\s*\}\}\s*(?:<\/[^>]+>|\*\*)?\s*(và em)/gi, '$1 $2')
    // info-table row "Phụ huynh | {{tenPhuHuynh}}" (innermost <tr> only)
    .replace(/<tr\b[^>]*>(?:(?!<tr\b|<\/tr>)[\s\S])*?\{\{\s*tenPhuHuynh\s*\}\}(?:(?!<tr\b|<\/tr>)[\s\S])*<\/tr>\s*/gi, '');
}
