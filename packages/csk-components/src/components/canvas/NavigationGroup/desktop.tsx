import { FC } from 'react';
import { UniformSlot } from '@uniformdev/next-app-router/component';
import { cn, resolveViewPort } from '@/utils/styling';
import { NavigationGroupParameters, NavigationGroupProps } from '.';

type NavigationGroupDesktopContentProps = Pick<NavigationGroupProps, 'context' | 'slots'> &
  Pick<NavigationGroupParameters, 'backgroundColor' | 'border'> & {
    isOpen: boolean;
  };

export const NavigationGroupDesktopContent: FC<NavigationGroupDesktopContentProps> = ({
  isOpen,
  backgroundColor,
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
        <UniformSlot slot={slots.links} />
      </div>
    </div>
  </div>
);
