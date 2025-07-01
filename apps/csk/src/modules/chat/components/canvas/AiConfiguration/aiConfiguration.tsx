import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { AiConfigurationProps } from '.';

export const AiConfiguration: FC<AiConfigurationProps> = ({ component, context, slots }) => (
  <UniformSlot data={component} context={context} slot={slots.content} />
);
