const level = process.env.NODE_ENV === 'test' ? 'silent' : 'info';

function timestamp(): string {
  return new Date().toISOString();
}

export const logger = {
  info: (...args: unknown[]) => level !== 'silent' && console.log(`[${timestamp()}] INFO`, ...args),
  warn: (...args: unknown[]) => level !== 'silent' && console.warn(`[${timestamp()}] WARN`, ...args),
  error: (...args: unknown[]) => level !== 'silent' && console.error(`[${timestamp()}] ERROR`, ...args),
};
