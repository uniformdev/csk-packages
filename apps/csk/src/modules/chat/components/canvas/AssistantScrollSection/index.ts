import { type ComponentProps } from '@uniformdev/csk-components/types/cskTypes';

enum AssistantScrollSectionSlots {
  content = 'content',
}

export type AssistantScrollSectionProps = ComponentProps<Record<string, unknown>, AssistantScrollSectionSlots>;

export { AssistantScrollSection as default } from './assistantSection';
