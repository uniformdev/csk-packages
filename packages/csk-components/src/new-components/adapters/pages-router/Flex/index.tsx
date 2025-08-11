import { ComponentProps } from '@uniformdev/canvas-react';
import { FlexParameters } from '@/new-components/canvas/Flex';

export type FlexAdditionalProps = {
  className?: string;
  wrapperClassName?: string;
};

export type FlexProps = ComponentProps<FlexParameters> & FlexAdditionalProps;

export { default } from './flex';
