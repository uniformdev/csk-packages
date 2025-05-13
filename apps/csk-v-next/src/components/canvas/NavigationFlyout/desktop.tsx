import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import Grid from '@/components/ui/Grid';
import GridItem from '@/components/ui/GridItem';
import { cn, resolveViewPort } from '@/utils/styling';
import { NavigationFlyoutProps } from '.';

type NavigationFlyoutPropsDesktopContentProps = Pick<
  NavigationFlyoutProps,
  'backgroundColor' | 'border' | 'context' | 'slots' | 'component'
> & {
  hasRightContent: boolean;
};

export const NavigationFlyoutPropsDesktopContent: FC<NavigationFlyoutPropsDesktopContentProps> = ({
  backgroundColor,
  context,
  slots,
  border,
  component,
}) => (
  <div
    className={cn('absolute lg:fixed xl:absolute z-10 w-screen left-0 shadow-lg pt-5 right-0 hidden group-hover:block')}
  >
    <div
      className={cn('p-8', {
        [`bg-${backgroundColor}`]: !!backgroundColor,
        [resolveViewPort(border, '{value}')]: border,
      })}
    >
      <Grid columnsCount="1" gapX="4">
        <GridItem>
          <div className="flex flex-col gap-y-4">
            <UniformSlot context={context} data={component} slot={slots.navigationFlyoutLeftContent} />
          </div>
        </GridItem>
      </Grid>
    </div>
  </div>
);
