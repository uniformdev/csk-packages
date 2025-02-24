import { FC, useEffect, useState } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ArrowIcon } from '@/components/ui/_icons';
import { cn } from '@/utils/styling';
import { NavigationGroupProps } from '.';

type NavigationGroupMobileContentProps = Pick<NavigationGroupProps, 'backgroundColor' | 'context' | 'slots'> & {
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

export const NavigationGroupMobileContent: FC<NavigationGroupMobileContentProps> = ({
  isOpen,
  backgroundColor,
  context,
  slots,
  onClose,
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

      <div className="flex flex-col items-center gap-y-4 p-4">
        <UniformSlot data={context} slot={slots.links} context={context} />
      </div>
    </div>
  );
};
