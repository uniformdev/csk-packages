import { FC, useState } from 'react';
import { ComponentProps } from '@uniformdev/canvas-react';
import { useUniformContext } from '@uniformdev/context-react';
import {
  Button as CSKButton,
  ButtonParameters as CSKButtonParameters,
} from '@uniformdev/csk-components/components/canvas';
import { Button as CSKUIButton } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useCard } from '@/providers/CardProvider';
import AnimatedDotsText from '../custom-ui/AnimatedDotsText';

type AddToCardButtonProps = ComponentProps<
  CSKButtonParameters & {
    fullWidth?: boolean;
    productSlug?: string;
    openMiniCart?: boolean;
  }
>;

const DELAY_TIME = 1600;

const AddToCardButton: FC<AddToCardButtonProps> = ({ productSlug, openMiniCart, fullWidth, ...props }) => {
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
          {...props}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default AddToCardButton;
