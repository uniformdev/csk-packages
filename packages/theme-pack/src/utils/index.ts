import {
  DEFAULT_BORDER_VARIANTS,
  DEFAULT_COLOR_PREFIXES,
  DEFAULT_COLOR_VARIANTS,
  DEFAULT_DIMENSION_PREFIXES,
  DEFAULT_DIMENSION_VARIANTS,
  DEFAULT_FONT_VARIANTS,
  DEFAULT_INTEGRATION_URL,
  DEFAULT_STYLES_PATH,
  FG_GREEN,
  TOKEN_FILE,
} from '../constants';

type AdditionalOptions = { prefixes?: string[]; variants?: string[] };

export const getStylesPath = () => {
  return (process.env.STYLES_PATH ?? DEFAULT_STYLES_PATH).split('/').filter(Boolean);
};

export const getIntegrationAPIURL = (endPoint: string, env?: string) =>
  `${process.env.INTEGRATION_URL || DEFAULT_INTEGRATION_URL}/api/${endPoint}?projectId=${process.env.UNIFORM_PROJECT_ID}${env ? `&env=${env}` : ''}`;

export const checkEnvironmentVariable = (tokenFile: TOKEN_FILE, isForce: boolean = false) => {
  if (process.env.DEV_MODE === 'true' && !isForce) {
    console.info(`Skip fetch ${tokenFile} from integration in dev mode`);
    return;
  }

  if (!process.env.INTEGRATION_URL) {
    throw new Error('No integration URL provided');
  }

  if (!process.env.UNIFORM_PROJECT_ID) {
    throw new Error('No project id provided');
  }
};

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

export const getTokensStyles = <T extends Record<string, string> | string>(
  tokens: Record<string, T>,
  getRoot?: (tokens: Record<string, T>) => string
) => `<style>${(getRoot || getRootSimpleTokensValue)(tokens)} </style>`;

export const isCanaryEnvironment =
  process.env.UNIFORM_CLI_BASE_URL && process.env.UNIFORM_CLI_BASE_URL.startsWith('https://canary');

export const syncSuccessLog = (token: TOKEN_FILE, mode: 'pushed' | 'pulled') => {
  console.info(FG_GREEN, `The ${token} configuration was successfully ${mode}`);
};
