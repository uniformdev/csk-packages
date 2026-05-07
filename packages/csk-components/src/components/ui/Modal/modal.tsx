'use client';

import { FC, useCallback, useState, MouseEvent, useRef, useEffect } from 'react';
import { resolveColor } from '@/utils/colorPalette';
import { cn } from '@/utils/styling';
import { ModalProps } from '.';
import { CloseIcon } from './close-icon';
import { getCloseButtonClasses, getDialogClasses, getFormClasses } from './style-utils';

export const Modal: FC<ModalProps> = ({
  trigger,
  content,
  actions,
  maxWidth,
  backgroundColor,
  closeIconColor,
  disableCloseModalOnClickOutside,
  onChangeModalState,
  className,
}) => {
  const modalActionsRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (onChangeModalState) {
      onChangeModalState(showModal);
    }
  }, [showModal, onChangeModalState]);

  const handleClickOutside = useCallback(() => {
    if (!disableCloseModalOnClickOutside) setShowModal(false);
  }, [disableCloseModalOnClickOutside]);

  const toggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  const handleClickContent = useCallback((e: MouseEvent<HTMLFormElement>) => {
    e.stopPropagation();
  }, []);

  const closeIcon = resolveColor(closeIconColor, 'fill');
  const formClasses = getFormClasses({ maxWidth, backgroundColor });

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
      <div onClick={toggleModal}>{trigger}</div>
      <div className={getDialogClasses({ showModal })}>
        <dialog
          open={showModal}
          onClick={handleClickOutside}
          aria-label="Close modal"
          aria-modal="true"
          className="flex size-full items-center justify-center bg-black/50 px-4"
        >
          <form
            method="dialog"
            className={cn(formClasses.className, className)}
            style={formClasses.style}
            onClick={handleClickContent}
          >
            <button onClick={toggleModal} className={getCloseButtonClasses({ disableCloseModalOnClickOutside })}>
              <CloseIcon className={closeIcon.className} style={closeIcon.style} />
            </button>
            <div className="p-6 md:p-8">{content}</div>
            {actions && (
              <div ref={modalActionsRef} className="border-t p-6 md:p-8">
                {actions}
              </div>
            )}
          </form>
        </dialog>
      </div>
    </div>
  );
};
