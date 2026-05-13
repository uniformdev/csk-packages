import { FC } from 'react';
import { UniformSlot } from '@uniformdev/next-app-router/component';
import Grid from '@/components/ui/Grid';
import GridItem from '@/components/ui/GridItem';
import { resolveColor } from '@/utils/colorPalette';
import { cn, resolveViewPort } from '@/utils/styling';
import { MegaMenuDesktopContent } from './mega-menu';
import { MegaMenuMasterDetailDesktopContent } from './mega-menu-master-detail';
import { NavigationFlyoutVariants } from './types';
import type { MegaMenuCategory, NavigationFlyoutParameters, NavigationFlyoutProps } from './types';

type NavigationFlyoutPropsDesktopContentProps = Pick<NavigationFlyoutProps, 'context' | 'slots' | 'component'> &
  Pick<NavigationFlyoutParameters, 'backgroundColor' | 'border'> & {
    isOpen: boolean;
    hasRightContent: boolean;
    variant?: string;
    onClose: () => void;
    onPanelMouseEnter: () => void;
    onPanelMouseLeave: () => void;
    menuId: string;
    anchorBottom: number;
    categories: MegaMenuCategory[];
    activeCategoryId: string;
    onCategoryHover: (id: string) => void;
  };

export const NavigationFlyoutPropsDesktopContent: FC<NavigationFlyoutPropsDesktopContentProps> = ({
  isOpen,
  backgroundColor,
  slots,
  border,
  hasRightContent,
  variant,
  onClose,
  onPanelMouseEnter,
  onPanelMouseLeave,
  menuId,
  anchorBottom,
  categories,
  activeCategoryId,
  onCategoryHover,
}) => {
  if (variant === NavigationFlyoutVariants.MegaMenu) {
    const sharedProps = {
      isOpen,
      backgroundColor,
      slots,
      border,
      onClose,
      onPanelMouseEnter,
      onPanelMouseLeave,
      menuId,
      anchorBottom,
    };

    if (categories.length > 0) {
      return (
        <MegaMenuMasterDetailDesktopContent
          {...sharedProps}
          hasRightContent={hasRightContent}
          categories={categories}
          activeCategoryId={activeCategoryId}
          onCategoryHover={onCategoryHover}
        />
      );
    }

    return <MegaMenuDesktopContent {...sharedProps} />;
  }

  const bg = resolveColor(backgroundColor, 'background');
  return (
    <div
      id={menuId}
      className={cn(
        'absolute z-10 w-max left-1/2 -translate-x-1/2 pt-4 motion-safe:transition-all motion-safe:duration-200',
        {
          'w-full md:w-[460px]': !hasRightContent,
          'w-full md:w-[460px] lg:w-[668px] xl:w-[768px]': hasRightContent,
          'translate-y-0 opacity-100': isOpen,
          'pointer-events-none -translate-y-1 opacity-0': !isOpen,
        }
      )}
    >
      <div
        className={cn('p-8', bg.className, {
          [resolveViewPort(border, '{value}')]: border,
        })}
        style={bg.style}
      >
        <Grid columnsCount="2" gapX="4">
          <GridItem>
            <div className="flex flex-col gap-y-4">
              <UniformSlot slot={slots.navigationFlyoutLeftContent} />
            </div>
          </GridItem>
          <GridItem>
            <UniformSlot slot={slots.navigationFlyoutRightContent} />
          </GridItem>
        </Grid>
      </div>
    </div>
  );
};
