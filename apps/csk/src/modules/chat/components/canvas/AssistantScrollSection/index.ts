import { type ComponentProps } from '@uniformdev/canvas-next-rsc/component';

enum AssistantScrollSectionSlots {
  content = 'content',
}

export type AssistantScrollSectionProps = ComponentProps<Record<string, unknown>, AssistantScrollSectionSlots>;

export { AssistantScrollSection as default } from './assistantSection';
