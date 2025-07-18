import { ComponentProps, ViewPort } from '@/types/cskTypes';

type AvailableAlignSelf = 'auto' | 'start' | 'end' | 'center' | 'stretch';
type AvailableShrink = '0' | '1';

export type FlexItemParameters = {
  displayName?: string;
  alignSelf?: AvailableAlignSelf | ViewPort<AvailableAlignSelf>;
  shrink?: AvailableShrink;
};

export enum FlexItemSlots {
  Inner = 'inner',
}

export type FlexItemProps = ComponentProps<FlexItemParameters, FlexItemSlots>;

export { default } from './flex-item';
