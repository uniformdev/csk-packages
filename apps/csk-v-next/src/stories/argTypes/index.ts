import { ButtonParameters } from '@/components/canvas/Button';
import { ContainerParameters } from '@/components/canvas/Container';
import { ImageParameters } from '@/components/canvas/Image';
import { TextParameters } from '@/components/canvas/Text';
import { ArgTypes } from '@storybook/react';
import theme from '../../../tailwind.config.theme.json';
import utilities from '../../../tailwind.utilities.json';

const colorKeys = Object.keys(theme.extend.colors || {});
const fontKeys = Object.keys(theme.extend.fontFamily || {});
const borderKeys = Object.keys(utilities || {}).map(key => key.substring(1));
const sizeKeys = Object.keys(theme.extend.spacing || {}).filter(key => key.startsWith('button'));

export const ContainerArgTypes: Partial<ArgTypes<ContainerParameters>> = {
  displayName: { control: 'text' },
  border: { control: 'select', options: borderKeys },
  backgroundColor: { control: 'select', options: colorKeys },
  fluidContent: { control: 'boolean' },
  fullHeight: { control: 'boolean' },
};

export const TextArgTypes: Partial<ArgTypes<TextParameters>> = {
  text: { control: 'text' },
  tag: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] },
  size: { control: 'select', options: ['base', 'xl', '2xl', '4xl', '5xl', '7xl'] },
  weight: { control: 'select', options: ['normal', 'medium', 'bold', 'extrabold'] },
  color: { control: 'select', options: colorKeys },
  font: { control: 'select', options: fontKeys },
  letterSpacing: { control: 'select', options: ['normal', 'tighter', 'tight', 'wide', 'wider', 'widest'] },
  alignment: { control: 'select', options: ['left', 'center', 'right'] },
  decoration: { control: 'select', options: ['underline', 'overline', 'line-through', 'no-underline'] },
  transform: { control: 'select', options: ['uppercase', 'lowercase', 'capitalize', 'normal-case'] },
  lineCountRestrictions: { control: 'select', options: ['1', '2', '3', '4', '5', '6', 'none'] },
};

export const ButtonArgTypes: Partial<ArgTypes<ButtonParameters>> = {
  text: { control: 'text' },
  buttonColor: { control: 'select', options: colorKeys },
  hoverButtonColor: { control: 'select', options: colorKeys },
  textColor: TextArgTypes.color,
  hoverTextColor: TextArgTypes.color,
  textWeight: TextArgTypes.weight,
  textTransform: TextArgTypes.transform,
  textFont: TextArgTypes.font,
  border: ContainerArgTypes.border,
  textSize: TextArgTypes.size,
  size: { control: 'select', options: sizeKeys },
  iconPosition: { control: 'select', options: ['left', 'right'] },
};

export const ImageArgTypes: Partial<ArgTypes<ImageParameters>> = {
  objectFit: { control: 'select', options: ['fill', 'contain', 'cover', 'none', 'scale-down'] },
  width: { control: { type: 'number', min: 0 } },
  height: { control: { type: 'number', min: 0 } },
  overlayColor: { control: 'select', options: colorKeys },
  overlayOpacity: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
  border: { control: 'select', options: borderKeys },
};
