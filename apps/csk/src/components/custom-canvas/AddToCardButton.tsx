'use client';

import { FC, useState } from 'react';
import { useUniformContext } from '@uniformdev/next-app-router/component';
import {
  Button as CSKButton,
  ButtonParameters as CSKButtonParameters,
  ButtonProps as CSKButtonProps,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import { Button as CSKUIButton } from '@uniformdev/csk-components/components/ui';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import { useCard } from '@/providers/CardProvider';
import AnimatedDotsText from '../custom-ui/AnimatedDotsText';

type AddToCardButtonParameters = CSKButtonParameters & {
  fullWidth?: boolean;
  productSlug?: string;
  openMiniCart?: boolean;
};

type AddToCardButtonProps = ComponentProps<AddToCardButtonParameters> & CSKButtonProps;

const DELAY_TIME = 1600;

const AddToCardButton: FC<AddToCardButtonProps & AddToCardButtonParameters> = ({
  productSlug,
  openMiniCart,
  fullWidth,
  ...props
}) => {
  const { context } = useUniformContext();
  const { addToCard } = useCard();
  const [showAdded, setShowAdded] = useState(false);

  const onClick = async () => {
    if (!productSlug) return;

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
      {showAdded ? (
        <CSKUIButton
          className={cn('h-fit relative', {
            'w-full text-center [&>span]:w-full': fullWidth,
          })}
          {...(props as CSKButtonParameters)}
          icon={undefined}
          onClick={onClick}
        >
          <span className="pointer-events-none invisible h-0 select-none">{props?.text}</span>
          <span className="absolute inset-0 flex size-full items-center justify-center">
            <AnimatedDotsText />
          </span>
        </CSKUIButton>
      ) : (
        <CSKButton
          className={cn('h-fit', {
            'w-full text-center [&>span]:w-full': fullWidth,
          })}
          {...(props as CSKButtonProps)}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default withFlattenParameters(AddToCardButton);
