export const getRootSimpleTokensValue = (tokens: Record<string, Record<string, string> | string>) => {
  const styleContent = Object.entries(tokens)
    .map(([key, value]) => `--${key}: ${value};\r\n\t`)
    .join('');
  return styleContent ? `:root {\r\n\t${styleContent}}` : '';
};

export const getRootBordersValue = (
  borders: Record<string, { color: string; width: string; radius: string; style: string }>
) => {
  const styleContent = Object.entries(borders)
    .map(
      ([key, value]) =>
        `--${key}-radius: ${value.radius};\r\n\t--${key}-width: ${value.width};\r\n\t--${key}-color: ${value.color};\r\n\t--${key}-style: ${value.style};\r\n\t`
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
