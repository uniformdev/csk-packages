import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { cn, resolveViewPort } from '@/utils/styling';
import { NavigationGroupProps } from '.';

type NavigationGroupDesktopContentProps = Pick<
  NavigationGroupProps,
  'backgroundColor' | 'border' | 'context' | 'slots'
> & {
  isOpen: boolean;
};

export const NavigationGroupDesktopContent: FC<NavigationGroupDesktopContentProps> = ({
  isOpen,
  backgroundColor,
  context,
  slots,
  border,
}) => (
  <div
    className={cn('absolute left-0 max-w-64 z-10 pt-4', {
      hidden: !isOpen,
      block: isOpen,
    })}
  >
    <div
      className={cn({
        [`bg-${backgroundColor}`]: !!backgroundColor,
        [resolveViewPort(border, '{value}')]: border,
      })}
    >
      <div className="flex flex-col gap-y-4 p-4">
        <UniformSlot data={context} slot={slots.links} context={context} />
      </div>
    </div>
  </div>
);
