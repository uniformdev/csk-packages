import type { DataWithProperties } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';

export type AiAssistantParameters = {
  starterPrompts: DataWithProperties;
};

export type AiAssistantProps = ComponentProps<AiAssistantParameters>;

export { AiAssistant as default } from './aiAssistant';
