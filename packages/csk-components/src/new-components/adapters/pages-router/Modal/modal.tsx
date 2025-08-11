import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { ModalEmptyPlaceholder, ModalSlots } from '@/new-components/canvas/Modal';
import BaseModal from '@/new-components/ui/Modal';
import { ModalProps } from '.';

const Modal: FC<ModalProps> = ({ maxWidth, backgroundColor, closeIconColor, disableCloseModalOnClickOutside }) => (
  <BaseModal
    {...{ maxWidth, backgroundColor, closeIconColor, disableCloseModalOnClickOutside }}
    trigger={
      <UniformSlot
        name={ModalSlots.Trigger}
        emptyPlaceholder={<ModalEmptyPlaceholder slotName={ModalSlots.Trigger} />}
      />
    }
    content={
      <UniformSlot
        name={ModalSlots.ModalContent}
        emptyPlaceholder={<ModalEmptyPlaceholder slotName={ModalSlots.ModalContent} />}
      />
    }
    actions={
      <UniformSlot
        name={ModalSlots.ModalActions}
        emptyPlaceholder={<ModalEmptyPlaceholder slotName={ModalSlots.ModalActions} />}
      />
    }
  />
);

export default Modal;
