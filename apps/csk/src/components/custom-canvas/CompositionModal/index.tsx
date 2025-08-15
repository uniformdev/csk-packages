import dynamic from 'next/dynamic';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';

export const MaxWidthMap = {
  small: 'max-w-xl',
  medium: 'max-w-2xl',
  large: 'max-w-4xl',
};

export type ModalParameters = {
  maxWidth?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  compositionNode?: LinkParamValue;
  closeIconColor?: string;
  disableCloseModalOnClickOutside?: boolean;
  loadingIndicatorColor?: string;
};

export enum ModalSlots {
  Trigger = 'trigger',
  ModalContent = 'modalContent',
  ModalActions = 'modalActions',
}

export type ModalProps = ComponentProps<ModalParameters, ModalSlots>;

export default dynamic(() => import('./composition-modal').then(mod => mod));
