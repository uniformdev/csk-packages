import {
  DEFAULT_BORDER_VARIANTS,
  DEFAULT_COLOR_PREFIXES,
  DEFAULT_COLOR_VARIANTS,
  DEFAULT_DIMENSION_PREFIXES,
  DEFAULT_DIMENSION_VARIANTS,
  DEFAULT_FONT_VARIANTS,
} from '../constants';

type AdditionalOptions = { prefixes?: string[]; variants?: string[] };

export const generateTailwindcssColorKeysPattern = (colorKeys: string[], additionalOpt?: AdditionalOptions) => {
  const prefixes = [...new Set([...DEFAULT_COLOR_PREFIXES, ...(additionalOpt?.prefixes || [])])];
  const variants = [...new Set([...DEFAULT_COLOR_VARIANTS, ...(additionalOpt?.variants || [])])];
  return {
    pattern: new RegExp(colorKeys.length ? `(${prefixes.join('|')})-(${colorKeys.join('|')})` : ''),
    ...(variants.length ? { variants } : undefined),
  };
};

export const generateTailwindcssDimensionKeysPattern = (dimensionKeys: string[], additionalOpt?: AdditionalOptions) => {
  const tablePrefixed = ['p'];
  const prefixes = [...new Set([...DEFAULT_DIMENSION_PREFIXES, ...(additionalOpt?.prefixes || [])])];
  const variants = [...new Set([...DEFAULT_DIMENSION_VARIANTS, ...(additionalOpt?.variants || [])])];
  return [
    {
      pattern: new RegExp(dimensionKeys.length ? `(${prefixes.join('|')})-(${dimensionKeys.join('|')})` : ''),
      ...(variants.length ? { variants } : undefined),
    },
    {
      pattern: new RegExp(dimensionKeys.length ? `(${tablePrefixed.join('|')})-(${dimensionKeys.join('|')})` : ''),
      variants: ['[&_td]', '[&_th]'],
    },
  ];
};

export const generateTailwindcssFontKeysPattern = (
  fonts: string[],
  additionalOpt?: Pick<AdditionalOptions, 'variants'>
) => {
  const variants = [...new Set([...DEFAULT_FONT_VARIANTS, ...(additionalOpt?.variants || [])])];
  return {
    pattern: new RegExp(fonts.length ? `font-(${fonts.join('|')})` : ''),
    ...(variants.length ? { variants } : undefined),
  };
};

export const generateTailwindcssBorderKeysPattern = (
  borderKeys: string[],
  additionalOpt?: Pick<AdditionalOptions, 'variants'>
) => {
  const variants = [...new Set([...DEFAULT_BORDER_VARIANTS, ...(additionalOpt?.variants || [])])];
  return {
    pattern: new RegExp(borderKeys.length ? `(${borderKeys.join('|')})` : ''),
    ...(variants.length ? { variants } : undefined),
  };
};
