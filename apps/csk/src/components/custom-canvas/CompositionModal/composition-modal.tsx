'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { Modal as BaseModal } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import { Loading } from '@/components/custom-ui/Loading';
import { ModalProps, ModalParameters } from '.';
import { getComposition } from './get-composition';

const Modal: FC<ModalProps & ModalParameters> = ({
  slots,
  maxWidth,
  backgroundColor,
  compositionNode,
  closeIconColor,
  disableCloseModalOnClickOutside,
  loadingIndicatorColor,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [composition, setComposition] = useState<ReactNode | null>(null);

  useEffect(() => {
    const fetchComposition = async () => {
      setIsLoading(true);
      const composition = await getComposition(compositionNode);
      if (composition) {
        setComposition(composition);
      }
      setIsLoading(false);
    };

    if (isModalOpen) {
      fetchComposition();
    } else {
      setComposition(null);
    }
  }, [compositionNode, isModalOpen]);

  const handleModalStateChange = (state: boolean) => {
    setIsModalOpen(state);
  };

  return (
    <BaseModal
      {...{ maxWidth, backgroundColor, closeIconColor, disableCloseModalOnClickOutside }}
      className="min-w-xl min-h-[250px]"
      trigger={<UniformSlot slot={slots.trigger} />}
      content={
        isLoading ? (
          <div
            className={cn('flex h-full items-center justify-center overflow-hidden', {
              [`text-${loadingIndicatorColor}`]: loadingIndicatorColor,
            })}
          >
            <Loading className="rounded-lg" />
          </div>
        ) : (
          composition
        )
      }
      onChangeModalState={handleModalStateChange}
    />
  );
};

export default withFlattenParameters(Modal);
