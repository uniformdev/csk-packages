import { FlexParameters, FlexSlots } from '@/new-components/canvas/Flex';
import { ComponentProps } from '@/types/canvasTypes';

export type FlexAdditionalProps = {
  className?: string;
  wrapperClassName?: string;
};

export type FlexProps = ComponentProps<FlexParameters, FlexSlots> & FlexAdditionalProps;

export { default } from './flex';
