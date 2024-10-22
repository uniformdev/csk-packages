import { REGEX_ALIAS_VALUE, REGEX_BRACKETS } from '../constants';

export const resolveDesignTokenValue = (value: Record<string, string> | string) => {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    return `var(--${value.replace(REGEX_BRACKETS, '')})`;
  } else {
    return value;
  }
};

export const getValueWithAlias = (value: string) => {
  if (value.startsWith('var(--') && value.endsWith(')')) {
    return value.match(REGEX_ALIAS_VALUE)?.[1] || '';
  } else {
    return value;
  }
};

export const getRootSimpleTokensValue = (tokens: Record<string, Record<string, string> | string>) => {
  const styleContent = Object.entries(tokens)
    .map(([key, value]) => `--${key}: ${resolveDesignTokenValue(value)};\r\n\t`)
    .join('');
  return styleContent ? `:root {\r\n\t${styleContent}}` : '';
};

export const getRootBordersValue = (
  borders: Record<string, { color: string; width: string; radius: string; style: string }>
) => {
  const styleContent = Object.entries(borders)
    .map(
      ([key, value]) =>
        `--${key}-radius: ${resolveDesignTokenValue(value.radius)};\r\n\t--${key}-width: ${resolveDesignTokenValue(value.width)};\r\n\t--${key}-color: ${resolveDesignTokenValue(value.color)};\r\n\t--${key}-style: ${resolveDesignTokenValue(value.style)};\r\n\t`
    )
    .join('');
  return styleContent ? `:root {\r\n\t${styleContent}}` : '';
};

export const getFontFamilyName = (font: string) => font.split(':')[0];

export const getRootFontsValue = (fonts: Record<string, string>, defaultFont?: string) => {
  const styleContent = Object.entries(fonts)
    .map(
      ([key, value]) =>
        `--${key}: ${getFontFamilyName(value) || 'custom-font'}${defaultFont && key === defaultFont ? ' !important' : ''};\r\n\t`
    )
    .join('');
  return styleContent ? `:root {\r\n\t${styleContent}}` : '';
};

export const getFontUrl = (fonts: Record<string, string>) => {
  const urlFonts =
    Object.values(fonts).reduce<string[]>((acc, value) => (value ? [...acc, value.replaceAll(' ', '+')] : acc), []) ||
    [];
  return urlFonts.length
    ? `@import url('https://fonts.googleapis.com/css2?family=${urlFonts.join('&family=')}&display=swap');\r\n`
    : '';
};

export const getTokenStyles = <T extends Record<string, string> | string>(
  tokens: Record<string, T>,
  getRoot?: (tokens: Record<string, T>) => string
) => `<style>${(getRoot || getRootSimpleTokensValue)(tokens)} </style>`;
