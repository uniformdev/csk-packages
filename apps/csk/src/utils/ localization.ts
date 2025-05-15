export const RTL_LANGUAGE_CODES: string[] = ['ar', 'he', 'fa', 'ur', 'ps', 'dv', 'ku'];

export function isRtlLocale(locale?: string | null): boolean {
  if (!locale || typeof locale !== 'string') return false;
  const primaryCode = locale.split('-')[0].toLowerCase();
  return RTL_LANGUAGE_CODES.includes(primaryCode);
}

export function getDir(locale?: string | null): 'rtl' | 'ltr' {
  return isRtlLocale(locale) ? 'rtl' : 'ltr';
}
