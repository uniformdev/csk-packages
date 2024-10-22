import { REGEX_ALIAS_VALUE, REGEX_BRACKETS, ROOT_COLOR_SCHEME_KEY } from '../constants';

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

export const getColorTokensValue = (tokens: Record<string, Record<string, string> | string>): string => {
  const colorSchemes = Object.entries(tokens).reduce(
    (acc, [scheme, tokenValues]) => {
      const styleContent = Object.entries(tokenValues)
        .map(([tokenKey, tokenValue]) => `--${tokenKey}: ${resolveDesignTokenValue(tokenValue)};\r\n\t`)
        .join('');

      acc[scheme] = styleContent;
      return acc;
    },
    {} as Record<string, string>
  );

  return Object.entries(colorSchemes).reduce((css, [scheme, styles]) => {
    const selector = scheme === ROOT_COLOR_SCHEME_KEY ? ':root' : `.${scheme}`;
    return `${css}${selector} {\r\n\t${styles}}\r\n`;
  }, '');
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
