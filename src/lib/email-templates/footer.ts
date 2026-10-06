// Shared navy footer of every library email (company, contacts, offices | social links).
// Taken verbatim from the approved reference letter (email-lich-phong-van-*.html): two columns on desktop,
// stacked on a phone via the .col / .ft-* rules in FOOTER_CSS, with MSO ghost tables for Outlook.
// It is 660px wide by design, so templates carrying it use a 660px card (upgradeFooter widens it).

export const FOOTER_START = '<!--FOOTER-V3-->';
export const FOOTER_END = '<!--/FOOTER-V3-->';
const CSS_MARK = '/*FOOTER-V3*/';

export const FOOTER_CSS = `${CSS_MARK}
  @media only screen and (max-width:680px) {
    .col { max-width:100% !important; width:100% !important; }
    .ft-sep { border-left:0 !important; padding-left:0 !important; border-top:1px solid #3A5A8C !important; padding-top:16px !important; margin-top:16px !important; }
    .ft-addr { padding:8px 0 0 0 !important; }
    .ft-txt { font-size:12px !important; line-height:19px !important; white-space:normal !important; }
    .ft-head { font-size:12px !important; }
  }`;

export const EMAIL_FOOTER = `${FOOTER_START}
<!-- Footer: [tên công ty / liên hệ | địa chỉ] | [mạng xã hội] -->
<tr><td bgcolor="#002B66" style="background-color:#002B66;padding:16px 12px 13px;font-size:0;">
  <!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td width="434" valign="top"><![endif]-->
  <div class="col" style="display:inline-block;width:100%;max-width:434px;vertical-align:top;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr><td class="ft-head" style="font-family:Arial,Helvetica,sans-serif;font-size:10.5px;line-height:15px;font-weight:bold;color:#FFFFFF;letter-spacing:0.4px;padding:0 0 9px 1px;">CÔNG TY TNHH TƯ VẤN DU HỌC CATHOLIC MTA</td></tr>
      <tr><td style="font-size:0;">
        <!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td width="140" valign="top"><![endif]-->
        <div class="col" style="display:inline-block;width:100%;max-width:140px;vertical-align:top;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="13" valign="middle" style="width:13px;padding:3px 6px 3px 0;"><img src="/email/ft-phone.png" width="13" height="13" alt="" style="display:block;width:13px;height:13px;border:0;outline:none;text-decoration:none;"></td>
              <td class="ft-txt" valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:14px;color:#FFFFFF;padding:3px 0;white-space:nowrap;"><a href="tel:+84909451822" style="color:#FFFFFF;text-decoration:none;">0909 451 822</a> – <a href="tel:+84902968652" style="color:#FFFFFF;text-decoration:none;">0902 968 652</a></td>
            </tr>
            <tr>
              <td width="13" valign="middle" style="width:13px;padding:3px 6px 3px 0;"><img src="/email/ft-mail.png" width="13" height="11" alt="" style="display:block;width:13px;height:11px;border:0;outline:none;text-decoration:none;"></td>
              <td class="ft-txt" valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:14px;color:#FFFFFF;padding:3px 0;white-space:nowrap;"><a href="mailto:info@mtacorporation.com" style="color:#FFFFFF;text-decoration:underline;">info@mtacorporation.com</a></td>
            </tr>
            <tr>
              <td width="13" valign="middle" style="width:13px;padding:3px 6px 3px 0;"><img src="/email/ft-web.png" width="13" height="13" alt="" style="display:block;width:13px;height:13px;border:0;outline:none;text-decoration:none;"></td>
              <td class="ft-txt" valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:14px;color:#FFFFFF;padding:3px 0;white-space:nowrap;"><a href="https://catholicmta.edu.vn" target="_blank" style="color:#FFFFFF;text-decoration:underline;">catholicmta.edu.vn</a></td>
            </tr>
          </table>
        </div>
        <!--[if mso]></td><td width="294" valign="top" style="padding-left:11px;padding-right:11px;"><![endif]-->
        <div class="col ft-addr" style="display:inline-block;width:100%;max-width:272px;vertical-align:top;padding-left:11px;padding-right:11px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr><td class="ft-txt" style="font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:14px;color:#FFFFFF;padding:3px 0;white-space:nowrap;"><strong style="color:#FE9B03;">Việt Nam:</strong> 45 Đinh Tiên Hoàng, Phường Sài Gòn, TP.HCM</td></tr>
            <tr><td class="ft-txt" style="font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:14px;color:#FFFFFF;padding:3px 0;white-space:nowrap;"><strong style="color:#FE9B03;">Hoa Kỳ:</strong> 8107 Bolsa Ave, Midway City, CA 92655</td></tr>
            <tr><td class="ft-txt" style="font-family:Arial,Helvetica,sans-serif;font-size:9px;line-height:14px;color:#FFFFFF;padding:3px 0;white-space:nowrap;"><strong style="color:#FE9B03;">Canada:</strong> 110 James St. Suite 200, St. Catharines, ON L2R 7E8, CA</td></tr>
          </table>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
      </td></tr>
    </table>
  </div>
  <!--[if mso]></td><td width="200" valign="top" style="border-left:1px solid #3A5A8C;padding-left:11px;"><![endif]-->
  <div class="col ft-sep" style="display:inline-block;width:100%;max-width:188px;vertical-align:top;border-left:1px solid #3A5A8C;padding:0 0 14px 11px;text-align:center;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr><td align="center" class="ft-head" style="font-family:Arial,Helvetica,sans-serif;font-size:9.5px;line-height:15px;font-weight:bold;color:#FFFFFF;letter-spacing:0.4px;padding-bottom:9px;text-align:center;white-space:nowrap;">HÃY KẾT NỐI CÙNG CHÚNG TÔI</td></tr>
      <tr><td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
          <td style="padding-right:4px;"><a href="https://www.facebook.com/duhoccatholicmta" target="_blank" rel="noopener" title="Facebook" style="text-decoration:none;"><img src="/email/ft-facebook.png" width="24" height="25" alt="Facebook" style="display:block;width:24px;height:25px;border:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;color:#FFFFFF;"></a></td><td style="padding-right:4px;"><a href="https://www.youtube.com/@duhoccatholicmta" target="_blank" rel="noopener" title="YouTube" style="text-decoration:none;"><img src="/email/ft-youtube.png" width="24" height="25" alt="YouTube" style="display:block;width:24px;height:25px;border:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;color:#FFFFFF;"></a></td><td style="padding-right:4px;"><a href="https://www.instagram.com/duhoc_catholicmta" target="_blank" rel="noopener" title="Instagram" style="text-decoration:none;"><img src="/email/ft-instagram.png" width="24" height="25" alt="Instagram" style="display:block;width:24px;height:25px;border:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;color:#FFFFFF;"></a></td><td style="padding-right:4px;"><a href="https://www.tiktok.com/@catholicmta" target="_blank" rel="noopener" title="TikTok" style="text-decoration:none;"><img src="/email/ft-tiktok.png" width="24" height="25" alt="TikTok" style="display:block;width:24px;height:25px;border:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;color:#FFFFFF;"></a></td><td style="padding-right:4px;"><a href="https://x.com/DHCATHOLICMTA" target="_blank" rel="noopener" title="X" style="text-decoration:none;"><img src="/email/ft-x.png" width="24" height="25" alt="X" style="display:block;width:24px;height:25px;border:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;color:#FFFFFF;"></a></td><td style="padding-right:0;"><a href="https://www.threads.com/@duhoc_catholicmta" target="_blank" rel="noopener" title="Threads" style="text-decoration:none;"><img src="/email/ft-threads.png" width="24" height="25" alt="Threads" style="display:block;width:24px;height:25px;border:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;color:#FFFFFF;"></a></td>
        </tr></table>
      </td></tr>
      <tr><td align="center" class="ft-txt" style="padding-top:9px;font-family:Arial,Helvetica,sans-serif;font-size:7.5px;line-height:12px;color:#FFFFFF;text-align:center;white-space:nowrap;">Facebook · YouTube · Instagram · TikTok · X · Threads</td></tr>
    </table>
  </div>
  <!--[if mso]></td></tr></table><![endif]-->
</td></tr>

<!-- Thanh màu dưới cùng -->
<tr><td>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
    <td width="50%" height="12" bgcolor="#055BB2" style="background-color:#055BB2;height:12px;font-size:0;line-height:0;">&nbsp;</td>
    <td width="50%" height="12" bgcolor="#FE8F04" style="background-color:#FE8F04;height:12px;font-size:0;line-height:0;">&nbsp;</td>
  </tr></table>
</td></tr>
${FOOTER_END}`;

// Swaps whichever older footer a template carries (the compact one-row letters, the multi-row FOOTER
// comment layout, or an earlier V2 block) up to and including the bottom colour strip for EMAIL_FOOTER, widens
// the card to 660px, and adds FOOTER_CSS. Unrecognised layouts come back unchanged, so a heavily
// hand-edited copy is never damaged.
export function upgradeFooter(html: string): { html: string; changed: boolean } {
  if (html.includes(FOOTER_START)) return { html, changed: false };
  const strip = /<tr>\s*<td>\s*<table[^>]*>\s*(?:<tbody>\s*)?<tr>\s*<td width="(?:45|50)%"/g;
  let stripAt = -1;
  for (const m of html.matchAll(strip)) stripAt = m.index!; // the last strip is the bottom one
  if (stripAt < 0) return { html, changed: false };
  const stripClose = /<\/table>\s*<\/td>\s*<\/tr>/g;
  stripClose.lastIndex = stripAt;
  const close = stripClose.exec(html);
  if (!close) return { html, changed: false };
  const end = close.index + close[0].length;

  const head = html.slice(0, stripAt);
  const v2 = head.lastIndexOf('<!--FOOTER-V2-->');
  const comment = head.lastIndexOf('<!-- FOOTER');
  const bare = head.search(/<tr>\s*<td bgcolor="#0f2f6b"[^>]*>(?:(?!<tr>)[\s\S])*?CÔNG TY TNHH/);
  const start = [v2, comment, bare].find((i) => i >= 0);
  if (start === undefined) return { html, changed: false };

  let out = `${html.slice(0, start)}${EMAIL_FOOTER}${html.slice(end)}`;
  out = out.replace('width="600"', 'width="660"').replace('max-width:600px', 'max-width:660px');
  if (!out.includes(CSS_MARK)) out = out.replace('</head>', `<style>\n  ${FOOTER_CSS}\n</style>\n</head>`);
  return { html: out, changed: true };
}
