export function sanitizeFileName(fileName: string): string {
  const invalidChars = /[\\/:*?"<>|]/g;
  const replaceWith = "_";
  return fileName
    .replace(invalidChars, replaceWith)
    .replace(/\s+/g, replaceWith);
}
