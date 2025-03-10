import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';

export type ChatParameters = Record<string, never>;

export enum ChatSlots {
  Recommendations = 'recommendations',
}

export type ChatProps = ComponentProps<ChatParameters, ChatSlots>;

export { default } from './chat';
