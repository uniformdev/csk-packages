'use client';

import { FC, useCallback, useState, MouseEvent, useRef, useEffect } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@uniformdev/theme-pack/utils/styling';
import { ModalProps } from '.';
import { CloseIcon } from './close-icon';
import { getCloseButtonClasses, getDialogClasses, getFormClasses } from './style-utils';

export const Modal: FC<ModalProps> = ({
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
      <div className={getDialogClasses({ showModal })}>
        <dialog
          open={showModal}
          onClick={handleClickOutside}
          aria-label="Close modal"
          aria-modal="true"
          className="flex size-full items-center justify-center bg-black/50 px-4"
        >
          <form method="dialog" className={getFormClasses({ maxWidth, backgroundColor })} onClick={handleClickContent}>
            <button onClick={toggleModal} className={getCloseButtonClasses({ disableCloseModalOnClickOutside })}>
              <CloseIcon
                className={cn({
                  [`fill-${closeIconColor}`]: closeIconColor,
                })}
              />
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
