export const FG_GREEN = '\x1b[32m';

export enum TOKEN_FILE {
  Colors = 'colors',
  Dimensions = 'dimensions',
  Fonts = 'fonts',
  Borders = 'borders',
}

export const DEFAULT_COLOR_PREFIXES = ['bg', 'text', 'decoration', 'border', 'ring', 'fill'];
export const DEFAULT_COLOR_VARIANTS = ['hover', 'dark', 'dark:hover'];

export const DEFAULT_DIMENSION_PREFIXES = ['mt', 'mb', 'mr', 'ml', 'pt', 'pb', 'pr', 'pl'];
export const DEFAULT_DIMENSION_VARIANTS: string[] = [];

export const DEFAULT_FONT_VARIANTS: string[] = [];
export const DEFAULT_BORDER_VARIANTS: string[] = [];

export const DEFAULT_INTEGRATION_URL = 'https://theme-pack-2.vercel.app';
export const DEFAULT_STYLES_PATH = '/src/styles';
export const DEFAULT_TAILWIND_CONF_PATH = 'tailwind.config.theme.json';
export const DEFAULT_TAILWIND_UTILITIES_PATH = 'tailwind.utilities.json';
