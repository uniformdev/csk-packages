import path from 'node:path';

export const FG_GREEN = '\x1b[32m';
export const REGEX_BRACKETS = /[{}]/g;
export const REGEX_ALIAS_VALUE = /var\(--([^)]+)\)/;

export enum TOKEN_STYLE_FILE {
  Colors = 'colors',
  Dimensions = 'dimensions',
  Fonts = 'fonts',
  Borders = 'borders',
  ThemeData = 'themeData',
}

export enum CONFIG_FILE {
  AllowedGroups = 'allowedGroups',
  Locales = 'locales',
}

export const DEFAULT_COLOR_PREFIXES = ['bg', 'text', 'decoration', 'border', 'ring', 'fill'];
export const DEFAULT_COLOR_VARIANTS = ['hover:', 'group-hover:', 'lg:', 'md:', ''];

export const DEFAULT_DIMENSION_PREFIXES = ['mt', 'mb', 'mr', 'ml', 'pt', 'pb', 'pr', 'pl', 'w', 'h', 'p'];
export const DEFAULT_DIMENSION_VARIANTS: string[] = ['[&_td]:', '[&_th]:', 'lg:', 'md:', ''];

export const DEFAULT_FONT_VARIANTS: string[] = ['lg:', 'md:', ''];

export const DEFAULT_BORDER_VARIANTS: string[] = ['lg:', 'md:', ''];

export const DEFAULT_INTEGRATION_URL = 'https://design-extensions.vercel.app';
export const DEFAULT_STYLES_PATH = path.join('src', 'styles');
export const DEFAULT_CONFIG_PATH = '';
export const DEFAULT_TAILWIND_CONF_PATH = 'tailwind.config.theme.json';
export const DEFAULT_TAILWIND_UTILITIES_PATH = 'tailwind.utilities.json';

export const DEFAULT_TAILWIND_FONT_CONF_PATH = 'tailwindcss.font.css';
export const DEFAULT_TAILWIND_DIMENSION_CONF_PATH = 'tailwindcss.dimension.css';
export const DEFAULT_TAILWIND_COLOR_CONF_PATH = 'tailwindcss.colors.css';
export const DEFAULT_TAILWIND_BORDER_CONF_PATH = 'tailwindcss.border.css';

export const PATH_TO_STYLE_FOLDER = path.join(
  ...(process.env.STYLES_PATH ?? DEFAULT_STYLES_PATH).split(/[\\/]/).filter(Boolean)
);

export const PATH_TO_CONFIG_FOLDER = path.join(
  ...(process.env.CONFIG_PATH ?? DEFAULT_CONFIG_PATH).split(/[\\/]/).filter(Boolean)
);

export const BASE_API_URL = process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app';

export const ROOT_COLOR_SCHEME_KEY = 'light';
