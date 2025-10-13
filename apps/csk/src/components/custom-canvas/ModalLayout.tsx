import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-react';
import { ContainerParameters } from '@uniformdev/csk-components/components/canvas';
import BaseModalLayout from '@/components/custom-ui/ModalLayout';

type ModalLayoutParameters = Pick<ContainerParameters, 'spacing' | 'border' | 'backgroundColor'> & {
  open?: boolean;
};

enum ModalLayoutSlots {
  LayoutContent = 'layoutContent',
}

type ModalLayoutProps = ComponentProps<ModalLayoutParameters>;

const ModalLayout: FC<ModalLayoutProps & ModalLayoutParameters> = ({ open, spacing, border, backgroundColor }) => (
  <BaseModalLayout isOpen={!!open} {...{ spacing, border, backgroundColor }}>
    <UniformSlot name={ModalLayoutSlots.LayoutContent} />
  </BaseModalLayout>
);

export default ModalLayout;
