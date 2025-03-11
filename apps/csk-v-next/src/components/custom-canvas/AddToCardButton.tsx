'use client';

import { FC } from 'react';
import { useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { Button as CSKButton, ButtonProps as CSKButtonProps } from '@uniformdev/csk-components/components/canvas';
import { cn } from '@uniformdev/csk-components/utils/styling';

type AddToCardButtonProps = CSKButtonProps & {
  fullWidth?: boolean;
};

const AddToCardButton: FC<AddToCardButtonProps> = ({ fullWidth, ...props }) => {
  const { context } = useUniformContext();

  const onClick = async () => {
    await context?.update({
      events: [{ event: 'added-to-cart' }],
    });
    alert('This button just place where you can add your custom logic');
  };

  return (
    <CSKButton
      className={cn('h-fit', {
        'w-full text-center [&>span]:w-full': fullWidth,
      })}
      {...props}
      onClick={onClick}
    />
  );
};

export default AddToCardButton;
