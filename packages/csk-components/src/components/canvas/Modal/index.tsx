import dynamic from 'next/dynamic';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';

export const MaxWidthMap = {
  small: 'max-w-xl',
  medium: 'max-w-2xl',
  large: 'max-w-4xl',
};

export type ModalParameters = {
  maxWidth?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  closeIconColor?: string;
  disableCloseModalOnClickOutside?: boolean;
};

export enum ModalSlots {
  Trigger = 'trigger',
  ModalContent = 'modalContent',
  ModalActions = 'modalActions',
}

export type ModalProps = ComponentProps<ModalParameters, ModalSlots>;

export default dynamic(() => import('./modal').then(mod => mod.Modal));
export { ModalEmptyPlaceholder } from './empty-placeholder';
