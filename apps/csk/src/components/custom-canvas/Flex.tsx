import { FC } from 'react';
import { Flex as CSKFlex, FlexProps as CSKFlexProps } from '@uniformdev/csk-components/components/canvas';
import { cn } from '@uniformdev/csk-components/utils/styling';

type FlexProps = CSKFlexProps & {
  fitHeight?: boolean;
};

const Flex: FC<FlexProps> = ({ fitHeight, ...props }) => (
  <CSKFlex
    className={cn({
      'h-full': fitHeight,
    })}
    wrapperClassName={cn({
      'h-full [&>div]:h-full': fitHeight,
    })}
    {...props}
  />
);

export default Flex;
