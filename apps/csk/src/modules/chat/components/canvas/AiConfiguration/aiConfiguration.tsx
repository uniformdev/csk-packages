import { FC } from 'react';
import { UniformSlot } from '@uniformdev/next-app-router/component';
import { AiConfigurationProps } from '.';

export const AiConfiguration: FC<AiConfigurationProps> = ({ slots }) => <UniformSlot slot={slots.content} />;
