import { ReactNode, ReactElement } from 'react';
import { TextParameters as BaseTextParameters } from '@/components/canvas/Text';

export type IconLabelProps = BaseTextParameters & {
  icon?: ReactNode;
  children: ReactElement | string;
  textClassName?: string;
};

export { IconLabel as default } from './IconLabel';
