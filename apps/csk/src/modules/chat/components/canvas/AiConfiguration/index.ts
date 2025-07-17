import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { PageParameters as CSKPageParameters } from '@uniformdev/csk-components/components/canvas';

export enum AiConfigurationSlots {
  Content = 'content',
}

export type AiConfigurationProps = ComponentProps<CSKPageParameters, AiConfigurationSlots>;

export { AiConfiguration as default } from './aiConfiguration';
