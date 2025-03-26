'use client';

import { FC } from 'react';
import { useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { Button as CSKButton, ButtonProps as CSKButtonProps } from '@uniformdev/csk-components/components/canvas';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useCard } from '@/modules/cart';

type AddToCardButtonProps = CSKButtonProps & {
  fullWidth?: boolean;
  productSlug: string;
};

const AddToCardButton: FC<AddToCardButtonProps> = ({ fullWidth, productSlug, ...props }) => {
  const { context } = useUniformContext();
  const { addToCard } = useCard();

  const onClick = async () => {
    await context?.update({
      events: [{ event: 'added-to-cart' }],
    });
    addToCard(productSlug, 1);
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
