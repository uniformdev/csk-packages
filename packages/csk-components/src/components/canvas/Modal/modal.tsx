'use client';

import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseModal from '@/components/ui/Modal';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { ModalParameters, ModalProps } from '.';

const Modal: FC<ModalProps & ModalParameters> = ({
  slots,
  maxWidth,
  backgroundColor,
  closeIconColor,
  disableCloseModalOnClickOutside,
}) => (
  <BaseModal
    {...{ maxWidth, backgroundColor, closeIconColor, disableCloseModalOnClickOutside }}
    trigger={<UniformSlot slot={slots.trigger} />}
    content={<UniformSlot slot={slots.modalContent} />}
    actions={slots?.modalActions?.items?.length && <UniformSlot slot={slots.modalActions} />}
  />
);

export default withFlattenParameters(Modal);
