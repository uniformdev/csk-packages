import path from 'node:path';

export const FG_GREEN = '\x1b[32m';
export const REGEX_BRACKETS = /[{}]/g;
export const REGEX_ALIAS_VALUE = /var\(--([^)]+)\)/;

export enum TOKEN_STYLE_FILE {
  Colors = 'colors',
  Dimensions = 'dimensions',
  Fonts = 'fonts',
  Borders = 'borders',
}

export enum CONFIG_FILE {
  AllowedGroups = 'allowedGroups',
  Locales = 'locales',
}

export const DEFAULT_COLOR_PREFIXES = ['bg', 'text', 'decoration', 'border', 'ring', 'fill'];
export const DEFAULT_COLOR_VARIANTS = ['hover', 'lg', 'md'];

export const DEFAULT_DIMENSION_PREFIXES = ['mt', 'mb', 'mr', 'ml', 'pt', 'pb', 'pr', 'pl', 'w', 'h'];
export const DEFAULT_DIMENSION_VARIANTS: string[] = ['lg', 'md'];

export const DEFAULT_FONT_VARIANTS: string[] = ['lg', 'md'];
export const DEFAULT_BORDER_VARIANTS: string[] = ['lg', 'md'];

export const DEFAULT_INTEGRATION_URL = 'https://theme-pack-2.vercel.app';
export const DEFAULT_STYLES_PATH = '/src/styles';
export const DEFAULT_LOCALES_PATH = '/src/i18n';
export const DEFAULT_CONFIG_PATH = '/';
export const DEFAULT_TAILWIND_CONF_PATH = 'tailwind.config.theme.json';
export const DEFAULT_TAILWIND_UTILITIES_PATH = 'tailwind.utilities.json';

export const PATH_TO_STYLE_FOLDER = path.join(
  ...(process.env.STYLES_PATH ?? DEFAULT_STYLES_PATH).split('/').filter(Boolean)
);

export const PATH_TO_CONFIG_FOLDER = path.join(
  ...(process.env.CONFIG_PATH ?? DEFAULT_CONFIG_PATH).split('/').filter(Boolean)
);

export const PATH_TO_LOCALES_FOLDER = path.join(
  ...(process.env.LOCALES_PATH ?? DEFAULT_LOCALES_PATH).split('/').filter(Boolean)
);

export const IS_CANARY_ENVIRONMENT =
  !!process.env.UNIFORM_CLI_BASE_URL && process.env.UNIFORM_CLI_BASE_URL.startsWith('https://canary');

export const ROOT_COLOR_SCHEME_KEY = 'light';

export const EXTRACT_CANVAS_COMPONENTS = [
  'Accordion',
  'AccordionItem',
  'Badge',
  'Banner',
  'Breadcrumbs',
  'Button',
  'Card',
  'Carousel',
  'Container',
  'Countdown',
  'DemoHero',
  'Divider',
  'Flex',
  'FlexItem',
  'Footer',
  'Grid',
  'GridItem',
  'Header',
  'IconLabel',
  'Image',
  'ImageGallery',
  'Link',
  'Modal',
  'NavigationFlyout',
  'NavigationGroup',
  'NavigationLink',
  'Page',
  'Review',
  'RichText',
  'Section',
  'Spacer',
  'Tab',
  'Table',
  'TableCustomCell',
  'TableDataCell',
  'TableHeaderCell',
  'TableRow',
  'Tabs',
  'Testimonial',
  'Text',
  'ThemeSwitcher',
  'Video',
];

export const EXTRACT_UI_COMPONENTS = [
  'Button',
  'Container',
  'FlexItem',
  'Grid',
  'Header',
  'Image',
  'MediaPlaceholder',
  'Rating',
  'ThemeSwitcher',
  '_icons',
  'Carousel',
  'Flex',
  'Footer',
  'GridItem',
  'IconLabel',
  'Link',
  'Page',
  'Text',
  'Video',
];

export const EXTRACT_UTILS = [
  'assets.ts',
  'createComponentResolver.ts',
  'createEmptyPlaceholderResolver.ts',
  'routing.ts',
  'styling.ts',
];

export const EXTRACT_HOCS = ['withPlaygroundWrapper.tsx'];

export const EXTRACT_TYPES = ['cskTypes.ts'];
