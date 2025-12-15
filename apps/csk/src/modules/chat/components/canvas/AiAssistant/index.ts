import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';

export type AiAssistantParameters = {
  starterPrompts?: {
    value: string;
  }[];
  modalTitle?: string;
  modalSubtitle?: string;
  inputPlaceholder?: string;
};

export type AiAssistantProps = ComponentProps<AiAssistantParameters>;

export { default } from './aiAssistant';
