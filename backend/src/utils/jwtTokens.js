import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET } from "../../config/env.js";
/** Khớp `expiresIn` khi sign — refresh token có hiệu lực 30 ngày. */
export const REFRESH_TOKEN_EXPIRES = "30d";
/** Cookie HttpOnly chứa JWT refresh (cùng thời hạn với token). */
export const REFRESH_COOKIE_NAME = "flyvisa_rt";
export const REFRESH_COOKIE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const REFRESH_PAYLOAD_TYP = "refresh";
export function signRefreshToken(employeeId) {
    return jwt.sign({ sub: employeeId, typ: REFRESH_PAYLOAD_TYP }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });
}
export function verifyRefreshToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
        if (decoded.typ !== REFRESH_PAYLOAD_TYP || typeof decoded.sub !== "string" || !decoded.sub) {
            return null;
        }
        return { sub: decoded.sub };
    }
    catch {
        return null;
    }
}
/** Đọc cookie từ header (không cần cookie-parser). */
export function getCookieFromRequest(req, name) {
    const raw = req.headers.cookie;
    if (!raw)
        return undefined;
    for (const segment of raw.split(";")) {
        const idx = segment.indexOf("=");
        if (idx === -1)
            continue;
        const k = segment.slice(0, idx).trim();
        if (k !== name)
            continue;
        return decodeURIComponent(segment.slice(idx + 1).trim());
    }
    return undefined;
}
