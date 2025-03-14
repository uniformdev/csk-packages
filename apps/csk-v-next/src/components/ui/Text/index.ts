import { ReactElement } from 'react';
import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
import { ViewPort } from '@/types/cskTypes';

type TextSize = keyof DefaultTheme['fontSize'];
type AvailableAlignment = 'left' | 'center' | 'right';

export type TextProps = {
  className?: string;
  size?: TextSize | ViewPort<TextSize>;
  color?: string;
  weight?: keyof DefaultTheme['fontWeight'];
  font?: string;
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
  decoration?: 'underline' | 'overline' | 'line-through' | 'no-underline';
  letterSpacing?: keyof DefaultTheme['letterSpacing'];
  children: ReactElement | string;
  alignment?: AvailableAlignment | ViewPort<AvailableAlignment>;
  lineCountRestrictions?: string;
};

export { Text as default } from './text';
