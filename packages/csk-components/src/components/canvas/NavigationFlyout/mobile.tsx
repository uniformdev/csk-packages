import { FC, Fragment, useEffect, useState } from 'react';
import { UniformSlot } from '@uniformdev/next-app-router/component';
import { ArrowIcon } from '@/components/ui/_icons';
import { resolveColor } from '@/utils/colorPalette';
import { cn } from '@/utils/styling';
import { MegaMenuContext } from './mega-menu-context';
import type { MegaMenuCategory, NavigationFlyoutParameters, NavigationFlyoutProps } from './types';

type NavigationFlyoutPropsMobileContentProps = Pick<NavigationFlyoutProps, 'context' | 'slots' | 'component'> &
  Pick<NavigationFlyoutParameters, 'backgroundColor'> & {
    isOpen: boolean;
    onClose: () => void;
    categories: MegaMenuCategory[];
  };

const useHeaderHeight = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById('mobile-header');
    if (header) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  return headerHeight;
};

export const NavigationFlyoutPropsMobileContent: FC<NavigationFlyoutPropsMobileContentProps> = ({
  isOpen,
  backgroundColor,
  slots,
  onClose,
  categories,
}) => {
  const headerHeight = useHeaderHeight();
  const bg = resolveColor(backgroundColor, 'background');

  return (
    <div
      style={{ ...bg.style, top: headerHeight }}
      className={cn('fixed left-0 right-0 bottom-0 z-10 w-full pt-4 overflow-y-auto', bg.className, {
        hidden: !isOpen,
        block: isOpen,
      })}
    >
      <button onClick={onClose} className="w-max rotate-180 px-4">
        <ArrowIcon />
      </button>

      {categories.length > 0 ? (
        <MegaMenuContext.Provider value={{ isInsideCategorizedMegaMenu: true }}>
          <div className="flex flex-col gap-y-8 p-4">
            {categories.map(c => (
              <section key={c.id}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide">{c.text}</h3>
                <UniformSlot slot={slots.navigationFlyoutLeftContent}>
                  {({ child, _id, key }) =>
                    _id === c.id ? <Fragment key={key}>{child}</Fragment> : <Fragment key={key} />
                  }
                </UniformSlot>
              </section>
            ))}
            <UniformSlot slot={slots.navigationFlyoutRightContent} />
          </div>
        </MegaMenuContext.Provider>
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-8 p-4">
          <UniformSlot slot={slots.navigationFlyoutLeftContent} />
          <UniformSlot slot={slots.navigationFlyoutRightContent} />
        </div>
      )}
    </div>
  );
};
