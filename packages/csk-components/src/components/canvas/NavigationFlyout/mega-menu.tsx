import { FC } from 'react';
import { UniformSlot } from '@uniformdev/next-app-router/component';
import Grid from '@/components/ui/Grid';
import GridItem from '@/components/ui/GridItem';
import { resolveColor } from '@/utils/colorPalette';
import { cn, resolveViewPort } from '@/utils/styling';
import type { NavigationFlyoutParameters, NavigationFlyoutProps } from './types';

type MegaMenuDesktopContentProps = Pick<NavigationFlyoutProps, 'slots'> &
  Pick<NavigationFlyoutParameters, 'backgroundColor' | 'border'> & {
    isOpen: boolean;
    onClose: () => void;
    onPanelMouseEnter: () => void;
    onPanelMouseLeave: () => void;
    menuId: string;
    anchorBottom: number;
  };

export const MegaMenuDesktopContent: FC<MegaMenuDesktopContentProps> = ({
  isOpen,
  backgroundColor,
  slots,
  border,
  onClose,
  onPanelMouseEnter,
  onPanelMouseLeave,
  menuId,
  anchorBottom,
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
        <Grid className="py-10" columnsCount="2" gapX="8">
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
    </>
  );
};
