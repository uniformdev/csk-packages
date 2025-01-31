import dynamic from 'next/dynamic';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { TextProps as BaseTextProps } from '@uniformdev/csk-components/components/ui';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';

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

export default dynamic(() => import('./countdown').then(mod => mod.Countdown));
export { CountdownEmptyPlaceholder } from './empty-placeholder';
