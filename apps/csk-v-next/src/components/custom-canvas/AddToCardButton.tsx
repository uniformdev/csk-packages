'use client';

import { FC, useState } from 'react';
import { useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { Button as CSKButton, ButtonProps as CSKButtonProps } from '@uniformdev/csk-components/components/canvas';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useCard } from '@/modules/cart';

type AddToCardButtonProps = CSKButtonProps & {
  fullWidth?: boolean;
  productSlug: string;
  openMiniCart?: boolean;
};

const DELAY_TIME = 1000;

const AddToCardButton: FC<AddToCardButtonProps> = ({ fullWidth, productSlug, openMiniCart, ...props }) => {
  const { context } = useUniformContext();
  const { addToCard } = useCard();
  const [showAdded, setShowAdded] = useState(false);

  const onClick = async () => {
    if (showAdded) {
      setShowAdded(false);
      return;
    }
    await context?.update({
      events: [{ event: 'added-to-cart' }],
    });
    addToCard(productSlug, 1, openMiniCart);
    if (!openMiniCart) {
      setShowAdded(true);
      setTimeout(() => {
        setShowAdded(false);
      }, DELAY_TIME);
    }
  };

  return (
    <div className="relative w-full">
      <CSKButton
        className={cn('h-fit', {
          'w-full text-center [&>span]:w-full': fullWidth,
        })}
        {...props}
        onClick={onClick}
      />

      <div
        onClick={e => {
          e.stopPropagation();
          setShowAdded(false);
        }}
        className={cn('absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out', {
          [`bg-${props.buttonColor}`]: props.buttonColor,
          [`text-${props.textColor}`]: props.textColor,
          'opacity-0 pointer-events-none': !showAdded,
          'opacity-100 pointer-events-auto': showAdded,
        })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
    </div>
  );
};

export default AddToCardButton;
