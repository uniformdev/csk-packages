import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ViewPort } from '@/types/cskTypes';

type AvailableAlignSelf = 'auto' | 'start' | 'end' | 'center' | 'stretch';
type AvailableShrink = '0' | '1';

export type FlexItemParameters = {
  displayName?: string;
  alignSelf?: AvailableAlignSelf | ViewPort<AvailableAlignSelf>;
  shrink: AvailableShrink;
};

enum FlexItemSlots {
  Inner = 'inner',
}

export type FlexItemProps = ComponentProps<FlexItemParameters, FlexItemSlots>;

export { FlexItem as default } from './flex-item';
