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

export const getTokenStyles = <T extends Record<string, string> | string>(
  tokens: Record<string, T>,
  getRoot?: (tokens: Record<string, T>) => string
) => `<style>${(getRoot || getRootSimpleTokensValue)(tokens)} </style>`;
