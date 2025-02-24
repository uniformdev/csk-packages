import { FC, useEffect, useState } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ArrowIcon } from '@/components/ui/_icons';
import { cn } from '@/utils/styling';
import { NavigationFlyoutProps } from '.';

type NavigationFlyoutPropsMobileContentProps = Pick<
  NavigationFlyoutProps,
  'backgroundColor' | 'context' | 'slots' | 'component'
> & {
  isOpen: boolean;
  onClose: () => void;
};

const useHeaderHeight = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById('mobile-header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  return headerHeight;
};

export const NavigationFlyoutPropsMobileContent: FC<NavigationFlyoutPropsMobileContentProps> = ({
  isOpen,
  backgroundColor,
  context,
  slots,
  onClose,
  component,
}) => {
  const headerHeight = useHeaderHeight();

  return (
    <div
      style={{ top: headerHeight }}
      className={cn('fixed left-0 right-0 bottom-0 z-10 w-full pt-4', {
        [`bg-${backgroundColor}`]: !!backgroundColor,
        hidden: !isOpen,
        block: isOpen,
      })}
    >
      <button onClick={onClose} className="w-max rotate-180 px-4">
        <ArrowIcon />
      </button>

      <div className="flex flex-col items-center justify-center gap-y-8 p-4">
        <UniformSlot context={context} data={component} slot={slots.navigationFlyoutLeftContent} />
        <UniformSlot context={context} data={component} slot={slots.navigationFlyoutRightContent} />
      </div>
    </div>
  );
};
