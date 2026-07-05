/**
 * Placeholder virus scan — swap for ClamAV/VirusTotal integration before production.
 * Always reports "clean" so the upload flow has a real status field to wire the UI against.
 */
export async function scanFile(_filePath: string): Promise<'clean' | 'infected'> {
  return 'clean';
}
