import path from 'node:path';

export const FG_GREEN = '\x1b[32m';
export const REGEX_BRACKETS = /[{}]/g;
export const REGEX_ALIAS_VALUE = /var\(--([^)]+)\)/;

export enum TOKEN_STYLE_FILE {
  Colors = 'colors',
  Dimensions = 'dimensions',
  Fonts = 'fonts',
  Borders = 'borders',
  AllowedGroups = 'allowedGroups',
}

export const DEFAULT_COLOR_PREFIXES = ['bg', 'text', 'decoration', 'border', 'ring', 'fill'];
export const DEFAULT_COLOR_VARIANTS = ['hover', 'dark', 'dark:hover'];

export const DEFAULT_DIMENSION_PREFIXES = ['mt', 'mb', 'mr', 'ml', 'pt', 'pb', 'pr', 'pl', 'w', 'h'];
export const DEFAULT_DIMENSION_VARIANTS: string[] = [];

export const DEFAULT_FONT_VARIANTS: string[] = [];
export const DEFAULT_BORDER_VARIANTS: string[] = [];

export const DEFAULT_INTEGRATION_URL = 'https://theme-pack-2.vercel.app';
export const DEFAULT_STYLES_PATH = '/src/styles';
export const DEFAULT_CONFIG_PATH = '/';
export const DEFAULT_TAILWIND_CONF_PATH = 'tailwind.config.theme.json';
export const DEFAULT_TAILWIND_UTILITIES_PATH = 'tailwind.utilities.json';

export const PATH_TO_STYLE_FOLDER = path.join(
  ...(process.env.STYLES_PATH ?? DEFAULT_STYLES_PATH).split('/').filter(Boolean)
);

export const PATH_TO_CONFIG_FOLDER = path.join(
  ...(process.env.CONFIG_PATH ?? DEFAULT_CONFIG_PATH).split('/').filter(Boolean)
);

export const IS_CANARY_ENVIRONMENT =
  !!process.env.UNIFORM_CLI_BASE_URL && process.env.UNIFORM_CLI_BASE_URL.startsWith('https://canary');
