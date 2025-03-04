export const IMPORT_REGEX = /['"](\.\/[^'"]+|@\/[^'"]+)['"]/g;
export const FILE_EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx'];
export const SOURCE_CANVAS_FILES = ['index.tsx', 'empty-placeholder.tsx'];

export const MAPPING_REGEX = /\b[a-zA-Z0-9_]+Mapping\s*=\s*{(?:[^{}]*|\{(?:[^{}]*|\{[^{}]*\})*\})*}/g;
export const REGISTER_IMPORT_REGEX = /(import .+;)(?![\s\S]*import .+)/;
export const REGISTER_KEY_REGEX = (key: string) => new RegExp(`\\b${key}\\s*:\\s*[^,]+,?`, 'g');
export const END_MAPPER_REGEX = /}$/;

export const INITIAL_RESOLVER = `export { cskComponentsMapping } from '@uniformdev/csk-components/components/canvas';\n`;
export const START_RESOLVER = `import baseCskComponentsMapping from '@uniformdev/csk-components/components/canvas';\n\nexport const cskComponentsMapping = {\n  ...baseCskComponentsMapping,\n};\n`;

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

export enum cskComponentsNames {
  Accordion = 'accordion',
  AccordionItem = 'accordionItem',
  Badge = 'badge',
  Banner = 'banner',
  Button = 'button',
  Card = 'card',
  Carousel = 'carousel',
  Container = 'container',
  Countdown = 'countdown',
  Divider = 'divider',
  Grid = 'grid',
  GridItem = 'gridItem',
  Flex = 'flex',
  FlexItem = 'flexItem',
  Header = 'header',
  IconLabel = 'iconLabel',
  Image = 'image',
  ImageGallery = 'imageGallery',
  Link = 'link',
  Modal = 'modal',
  NavigationFlyout = 'navigationFlyout',
  NavigationGroup = 'navigationGroup',
  NavigationLink = 'navigationLink',
  Page = 'page',
  Review = 'review',
  RichText = 'richText',
  Section = 'section',
  Spacer = 'spacer',
  Tab = 'tab',
  Table = 'table',
  TableCustomCell = 'tableCustomCell',
  TableDataCell = 'tableDataCell',
  TableHeaderCell = 'tableHeaderCell',
  TableRow = 'tableRow',
  Tabs = 'tabs',
  Testimonial = 'testimonial',
  Text = 'text',
  ThemeSwitcher = 'themeSwitcher',
  Video = 'video',
  FixedHero = 'fixedHero',
  FlexibleHero = 'flexibleHero',
  Breadcrumbs = 'breadcrumbs',
  Footer = 'footer',
}
