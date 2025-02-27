export const IMPORT_REGEX = /['"](\.\/[^'"]+|@\/[^'"]+)['"]/g;
export const FILE_EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx'];
export const SOURCE_CANVAS_FILES = ['index.tsx', 'empty-placeholder.tsx'];

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
  'createEmptyPlaceholderResolver.tsx',
  'routing.ts',
  'styling.ts',
];

export const EXTRACT_HOCS = ['withPlaygroundWrapper.tsx'];

export const EXTRACT_TYPES = ['cskTypes.ts'];
