import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import Grid from '@/new-components/ui/Grid';
import GridItem from '@/new-components/ui/GridItem';
import { cn, resolveViewPort } from '@/utils/styling';
import { NavigationFlyoutProps, NavigationFlyoutParameters } from '.';

type NavigationFlyoutPropsDesktopContentProps = Pick<NavigationFlyoutProps, 'context' | 'slots' | 'component'> &
  Pick<NavigationFlyoutParameters, 'backgroundColor' | 'border'> & {
    isOpen: boolean;
    hasRightContent: boolean;
  };

export const NavigationFlyoutPropsDesktopContent: FC<NavigationFlyoutPropsDesktopContentProps> = ({
  isOpen,
  backgroundColor,
  slots,
  border,
  hasRightContent,
}) => (
  <div
    className={cn('absolute z-10 w-max left-1/2 -translate-x-1/2 pt-4', {
      hidden: !isOpen,
      block: isOpen,
      'w-full md:w-[460px]': !hasRightContent,
      'w-full md:w-[460px] xl:w-[768px]': hasRightContent,
    })}
  >
    <div
      className={cn('p-8', {
        [`bg-${backgroundColor}`]: !!backgroundColor,
        [resolveViewPort(border, '{value}')]: border,
      })}
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
