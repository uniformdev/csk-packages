import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';

export type AiAssistantParameters = {
  starterPrompts?: {
    value: string;
  }[];
};

export type AiAssistantProps = ComponentProps<AiAssistantParameters>;

export { default } from './aiAssistant';
