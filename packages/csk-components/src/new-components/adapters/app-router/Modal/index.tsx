import dynamic from 'next/dynamic';
import { ModalParameters, ModalSlots } from '@/new-components/canvas/Modal';
import { ComponentProps } from '@/types/canvasTypes';

export type ModalProps = ComponentProps<ModalParameters, ModalSlots>;

export default dynamic(() => import('./modal').then(mod => mod.default));
export { modalEmptyPlaceholderWrapper } from './empty-placeholder';
