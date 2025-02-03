import { ReactElement } from 'react';
import DefaultTheme from 'tailwindcss/defaultTheme';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';

type TextSize = keyof (typeof DefaultTheme)['fontSize'];

export type TextProps = {
  className?: string;
  size?: TextSize | ViewPort<TextSize>;
  color?: string;
  weight?: keyof (typeof DefaultTheme)['fontWeight'];
  font?: string;
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
  decoration?: 'underline' | 'overline' | 'line-through' | 'no-underline';
  letterSpacing?: keyof (typeof DefaultTheme)['letterSpacing'];
  children: ReactElement | string;
  alignment?: 'left' | 'center' | 'right';
  lineCountRestrictions?: string;
};

export { Text as default } from './text';
