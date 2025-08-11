import dynamic from 'next/dynamic';
import { TextProps as BaseTextProps } from '@/new-components/ui/Text';
import { ComponentProps, ViewPort } from '@/types/cskTypes';

type UniformDate = {
  datetime: string;
};

export type CountdownParameters = {
  targetDate?: UniformDate;
  backgroundColor?: string;
  textColor?: string;
  border?: string | ViewPort<string>;
  size?: BaseTextProps['size'];
};

export enum CountdownSlots {
  CountdownComplete = 'countdownComplete',
}

export enum CountdownVariants {
  LabelsUnder = 'labelsUnder',
}

export type CountdownProps = ComponentProps<CountdownParameters, CountdownSlots>;

export default dynamic(() => import('./countdown').then(mod => mod.default));
export { CountdownEmptyPlaceholder } from './empty-placeholder';
