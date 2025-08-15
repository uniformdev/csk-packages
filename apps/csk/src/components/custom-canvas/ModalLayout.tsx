import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { ContainerParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import BaseModalLayout from '@/components/custom-ui/ModalLayout';

type ModalLayoutParameters = Pick<ContainerParameters, 'spacing' | 'border' | 'backgroundColor'> & {
  open?: boolean;
};

enum ModalLayoutSlots {
  LayoutContent = 'layoutContent',
}

type ModalLayoutProps = ComponentProps<ModalLayoutParameters, ModalLayoutSlots>;

const ModalLayout: FC<ModalLayoutProps & ModalLayoutParameters> = ({
  open,
  spacing,
  border,
  backgroundColor,
  slots,
}) => (
  <BaseModalLayout isOpen={!!open} {...{ spacing, border, backgroundColor }}>
    <UniformSlot slot={slots.layoutContent} />
  </BaseModalLayout>
);

export default withFlattenParameters(ModalLayout);
