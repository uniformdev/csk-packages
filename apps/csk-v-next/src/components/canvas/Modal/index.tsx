'use client';
import { FC, useCallback, useState, MouseEvent, useRef, useEffect } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@/utils';

const MaxWidthMap = {
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
enum ModalSlots {
  Trigger = 'trigger',
  ModalContent = 'modalContent',
  ModalActions = 'modalActions',
}

type ModalProps = ComponentProps<ModalParameters, ModalSlots>;

const Modal: FC<ModalProps> = ({
  slots,
  component,
  context,
  maxWidth,
  backgroundColor,
  closeIconColor,
  disableCloseModalOnClickOutside,
}) => {
  const modalActionsRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  const handleClickOutside = useCallback(() => {
    if (!disableCloseModalOnClickOutside) setShowModal(false);
  }, [disableCloseModalOnClickOutside]);

  const toggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  const handleClickContent = useCallback((e: MouseEvent<HTMLFormElement>) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (!modalActionsRef.current) return;
    const currentActions = modalActionsRef.current.querySelectorAll('button, a');
    const handleClickButton = () => setShowModal(false);

    currentActions.forEach(button => {
      button.addEventListener('click', handleClickButton);
    });
    return () =>
      currentActions.forEach(button => {
        button.removeEventListener('click', handleClickButton);
      });
  }, []);

  return (
    <div>
      <div onClick={toggleModal}>
        <UniformSlot data={component} context={context} slot={slots.trigger} />
      </div>
      <div
        className={cn('fixed left-0 top-0 size-full', {
          hidden: !showModal,
          block: showModal,
        })}
      >
        <dialog
          open={showModal}
          onClick={handleClickOutside}
          aria-label="Close modal"
          aria-modal="true"
          className="flex size-full items-center justify-center bg-black/50 px-4"
        >
          <form
            method="dialog"
            className={cn('rounded-lg shadow-lg relative', MaxWidthMap[maxWidth || 'small'], {
              [`bg-${backgroundColor}`]: !!backgroundColor,
            })}
            onClick={handleClickContent}
          >
            <button
              onClick={toggleModal}
              className={cn('group absolute right-4 top-4 opacity-40 hover:opacity-100', {
                hidden: disableCloseModalOnClickOutside,
              })}
            >
              <svg
                style={{ fill: closeIconColor }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-8"
              >
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" />
              </svg>
            </button>
            <div className="p-6 md:p-8">
              <UniformSlot data={component} context={context} slot={slots.modalContent} />
            </div>
            {slots?.modalActions?.items?.length && (
              <div ref={modalActionsRef} className="border-t p-6 md:p-8">
                <UniformSlot data={component} context={context} slot={slots.modalActions} />
              </div>
            )}
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Modal;
