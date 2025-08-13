import { FC } from 'react';
import {
  Button as CSKButton,
  ButtonProps as CSKButtonProps,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
type ButtonProps = CSKButtonProps & {
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

export default withFlattenParameters(Button);
