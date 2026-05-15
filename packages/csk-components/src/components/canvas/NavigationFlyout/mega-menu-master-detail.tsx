import { FC, Fragment } from 'react';
import { UniformSlot } from '@uniformdev/next-app-router/component';
import { ChevronRightIcon } from '@/components/ui/_icons';
import Container from '@/components/ui/Container';
import { resolveColor } from '@/utils/colorPalette';
import { cn, resolveViewPort } from '@/utils/styling';
import { MegaMenuContext } from './mega-menu-context';
import type { MegaMenuCategory, NavigationFlyoutParameters, NavigationFlyoutProps } from './types';

type MegaMenuMasterDetailDesktopContentProps = Pick<NavigationFlyoutProps, 'slots'> &
  Pick<NavigationFlyoutParameters, 'backgroundColor' | 'border'> & {
    isOpen: boolean;
    hasRightContent: boolean;
    onClose: () => void;
    onPanelMouseEnter: () => void;
    onPanelMouseLeave: () => void;
    menuId: string;
    anchorBottom: number;
    categories: MegaMenuCategory[];
    activeCategoryId: string;
    onCategoryHover: (id: string) => void;
  };

export const MegaMenuMasterDetailDesktopContent: FC<MegaMenuMasterDetailDesktopContentProps> = ({
  isOpen,
  backgroundColor,
  slots,
  border,
  hasRightContent,
  onClose,
  onPanelMouseEnter,
  onPanelMouseLeave,
  menuId,
  anchorBottom,
  categories,
  activeCategoryId,
  onCategoryHover,
}) => {
  const bg = resolveColor(backgroundColor, 'background');

  return (
    <>
      <div
        onClick={onClose}
        style={{ top: anchorBottom }}
        className={cn(
          'fixed inset-x-0 bottom-0 z-[9] bg-black/40 motion-safe:transition-opacity motion-safe:duration-200',
          {
            'opacity-100': isOpen,
            'pointer-events-none opacity-0': !isOpen,
          }
        )}
        aria-hidden
      />

      <div
        id={menuId}
        role="region"
        onMouseEnter={onPanelMouseEnter}
        onMouseLeave={onPanelMouseLeave}
        style={{ ...bg.style, top: anchorBottom }}
        className={cn(
          'fixed inset-x-0 z-10 w-screen motion-safe:transition-all motion-safe:duration-200',
          bg.className,
          {
            [resolveViewPort(border, '{value}')]: border,
            'translate-y-0 opacity-100': isOpen,
            'pointer-events-none -translate-y-1 opacity-0': !isOpen,
          }
        )}
      >
        <Container>
          <div className="grid grid-cols-12 gap-x-8 py-10">
            <nav
              aria-label="Categories"
              className={cn('col-span-12', {
                'md:col-span-3': hasRightContent,
                'md:col-span-4': !hasRightContent,
              })}
            >
              <ul className="flex flex-col">
                {categories.map(c => {
                  const isActive = c.id === activeCategoryId;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onMouseEnter={() => onCategoryHover(c.id)}
                        onFocus={() => onCategoryHover(c.id)}
                        aria-current={isActive || undefined}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left motion-safe:transition-colors"
                      >
                        <span>{c.text}</span>
                        <ChevronRightIcon />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              className={cn('col-span-12', {
                'md:col-span-6': hasRightContent,
                'md:col-span-8': !hasRightContent,
              })}
            >
              <MegaMenuContext.Provider value={{ isInsideCategorizedMegaMenu: true }}>
                <UniformSlot slot={slots.navigationFlyoutLeftContent}>
                  {({ child, _id, key }) =>
                    _id === activeCategoryId ? <Fragment key={key}>{child}</Fragment> : <Fragment key={key} />
                  }
                </UniformSlot>
              </MegaMenuContext.Provider>
            </div>

            {hasRightContent && (
              <aside className="col-span-12 md:col-span-3 md:pl-8">
                <UniformSlot slot={slots.navigationFlyoutRightContent} />
              </aside>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};
