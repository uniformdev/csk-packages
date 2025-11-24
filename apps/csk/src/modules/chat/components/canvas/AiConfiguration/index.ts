import { PageParameters as CSKPageParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';

export enum AiConfigurationSlots {
  Content = 'content',
}

export type AiConfigurationProps = ComponentProps<CSKPageParameters, AiConfigurationSlots>;

export { AiConfiguration as default } from './aiConfiguration';
