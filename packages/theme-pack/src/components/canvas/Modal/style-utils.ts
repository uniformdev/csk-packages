import { cn } from '@uniformdev/theme-pack/utils/styling';
import { MaxWidthMap, ModalParameters } from '.';

type DialogClassesProps = {
  showModal?: boolean;
};
export const getDialogClasses = ({ showModal }: DialogClassesProps) =>
  cn('fixed left-0 top-0 size-full', {
    hidden: !showModal,
    block: showModal,
  });

type FormClassesProps = {
  maxWidth?: ModalParameters['maxWidth'];
  backgroundColor?: ModalParameters['backgroundColor'];
};
export const getFormClasses = ({ maxWidth, backgroundColor }: FormClassesProps) =>
  cn('rounded-lg shadow-lg relative', MaxWidthMap[maxWidth || 'small'], {
    [`bg-${backgroundColor}`]: !!backgroundColor,
  });

type CloseButtonClassesProps = {
  disableCloseModalOnClickOutside?: ModalParameters['disableCloseModalOnClickOutside'];
};
export const getCloseButtonClasses = ({ disableCloseModalOnClickOutside }: CloseButtonClassesProps) =>
  cn('group absolute right-4 top-4 opacity-40 hover:opacity-100', {
    hidden: disableCloseModalOnClickOutside,
  });
