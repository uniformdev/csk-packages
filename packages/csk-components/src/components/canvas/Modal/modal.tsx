'use client';

import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BaseModal from '@/components/ui/Modal';
import { ModalProps } from '.';

export const Modal: FC<ModalProps> = ({
  slots,
  component,
  context,
  maxWidth,
  backgroundColor,
  closeIconColor,
  disableCloseModalOnClickOutside,
}) => (
  <BaseModal
    {...{ maxWidth, backgroundColor, closeIconColor, disableCloseModalOnClickOutside }}
    trigger={<UniformSlot data={component} context={context} slot={slots.trigger} />}
    content={<UniformSlot data={component} context={context} slot={slots.modalContent} />}
    actions={
      slots?.modalActions?.items?.length && <UniformSlot data={component} context={context} slot={slots.modalActions} />
    }
  />
);
