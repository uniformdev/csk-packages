import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-react';
import { useUniformContext } from '@uniformdev/context-react';
import { Button as CSKButton, ButtonParameters } from '@uniformdev/csk-components/components/canvas';
import { cn } from '@uniformdev/csk-components/utils/styling';

type CompleteCheckoutButtonProps = ComponentProps<
  ButtonParameters & {
    fullWidth?: boolean;
  }
>;

const CompleteCheckoutButton: FC<CompleteCheckoutButtonProps> = ({ fullWidth, ...props }) => {
  const { context } = useUniformContext();

  const onClick = async () => {
    await context?.update({
      events: [{ event: 'purchase-complete' }],
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

export default CompleteCheckoutButton;
