import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-react';
import {
  Button as CSKButton,
  ButtonParameters as CSKButtonParameters,
} from '@uniformdev/csk-components/components/canvas';
import { cn } from '@uniformdev/csk-components/utils/styling';

type ButtonProps = ComponentProps<CSKButtonParameters> & {
  fullWidth?: boolean;
};

const Button: FC<ButtonProps> = ({ fullWidth, ...props }) => (
  <CSKButton
    className={cn('h-fit', {
      'w-full text-center [&>span]:w-full': fullWidth,
    })}
    {...props}
  />
);

export default Button;
