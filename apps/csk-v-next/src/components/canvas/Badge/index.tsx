import { FC } from 'react';
import { ComponentProps, UniformText } from '@uniformdev/canvas-next-rsc/component';
import BaseText from '@/components/ui/Text';
import { withPlaygroundWrapper } from '@/hocs';
import { cn } from '@/utils';

export type BadgeParameters = {
  text?: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  dotColor?: string;
  pill?: boolean;
  size?: string;
};

type BadgeProps = ComponentProps<BadgeParameters>;

const Badge: FC<BadgeProps> = ({
  component,
  context,
  textColor,
  backgroundColor,
  borderColor,
  dotColor,
  pill = false,
  size,
}) => {
  const pillClasses = cn({ 'rounded-full': pill, 'rounded-md': !pill });

  return (
    <div
      className={cn('inline-flex items-center w-fit', pillClasses, {
        'gap-x-1.5': !!dotColor,
        [`ring-1 ring-inset ring-${borderColor}`]: !!borderColor,
        [`bg-${backgroundColor}`]: !!backgroundColor,
        [`p-${size}`]: size,
      })}
    >
      {dotColor && (
        <svg
          viewBox="0 0 6 6"
          aria-hidden="true"
          className={cn('w-1.5 h-1.5', {
            [`fill-${dotColor}`]: dotColor,
          })}
        >
          <circle r="3" cx="3" cy="3" />
        </svg>
      )}
      <BaseText color={textColor} size="xs">
        <UniformText placeholder="Badge text goes here" parameterId="text" component={component} context={context} />
      </BaseText>
    </div>
  );
};

export default withPlaygroundWrapper(Badge);
