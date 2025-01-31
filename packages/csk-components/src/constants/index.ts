import path from 'node:path';

export const DEFAULT_COMPONENTS_PATH = '/src/components';
export const DEFAULT_MODULES_PATH = '/src';

export const PATH_TO_COMPONENTS_FOLDER = path.join(
  ...(process.env.COMPONENTS_PATH ?? DEFAULT_COMPONENTS_PATH).split('/').filter(Boolean)
);

export const PATH_TO_MODULES_FOLDER = path.join(
  ...(process.env.MODULES_PATH ?? DEFAULT_MODULES_PATH).split('/').filter(Boolean)
);

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
