import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { AiConfigurationProps } from '.';

export const AiConfiguration: FC<AiConfigurationProps> = ({ slots }) => <UniformSlot slot={slots.content} />;
