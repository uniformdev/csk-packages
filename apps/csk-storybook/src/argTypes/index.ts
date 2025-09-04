import {
  ContainerParameters,
  ButtonParameters,
  ImageParameters,
  TextParameters,
  VideoParameters,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import { ArgTypes } from '@storybook/react';
import theme from '../../themeData.json';

const colorKeys = theme.colors.map(color => color.colorKey);
const fontKeys = theme.fonts.map(font => font.fontKey);
const borderKeys = theme.borders.map(border => border.borderKey);
const sizeKeys = theme.dimensions.map(dimension => dimension.dimensionKey);

export const ContainerArgTypes: Partial<ArgTypes<ContainerParameters>> = {
  displayName: { control: 'text' },
  border: { control: 'select', options: borderKeys },
  backgroundColor: { control: 'select', options: colorKeys },
  fluidContent: { control: 'boolean' },
  height: { control: 'select', options: ['full', 'screen', 'svh', 'lvh', 'dvh', 'min', 'max', 'fit'] },
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

const presentationArgTypes: Partial<
  ArgTypes<Pick<ImageParameters | VideoParameters, 'overlayColor' | 'overlayOpacity' | 'border'>>
> = {
  overlayColor: { control: 'select', options: colorKeys },
  overlayOpacity: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
  border: { control: 'select', options: borderKeys },
};

export const ImageArgTypes: Partial<ArgTypes<ImageParameters>> = {
  objectFit: { control: 'select', options: ['fill', 'contain', 'cover', 'none', 'scale-down'] },
  width: { control: { type: 'number', min: 0 } },
  height: { control: { type: 'number', min: 0 } },
  ...presentationArgTypes,
};

export const VideoArgTypes: Partial<ArgTypes<VideoParameters>> = {
  autoPlay: { control: 'boolean' },
  lazyLoad: { control: 'boolean' },
  loop: { control: 'boolean' },
  controls: { control: 'boolean' },
  muted: { control: 'boolean' },
  ...presentationArgTypes,
};
