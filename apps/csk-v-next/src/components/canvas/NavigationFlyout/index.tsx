'use client';

import { FC, useCallback, useMemo, useState } from 'react';
import { Asset } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps, UniformText } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters as BaseTextParameters } from '@/components/canvas/Text';
import { ChevronDownIcon } from '@/components/ui/_icons';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import { withPlaygroundWrapper } from '@/hocs';
import { ViewPort } from '@/types';
import { cn, resolveAsset } from '@/utils';
import { NavigationFlyoutPropsDesktopContent } from './desktop';
import { NavigationFlyoutPropsMobileContent } from './mobile';

export type NavigationFlyoutParameters = BaseTextParameters & {
  icon?: Asset[];
  link?: LinkParamValue;
  backgroundColor?: string;
  border?: string | ViewPort<string>;
};

enum NavigationFlyoutSlots {
  NavigationFlyoutLeftContent = 'navigationFlyoutLeftContent',
  NavigationFlyoutRightContent = 'navigationFlyoutRightContent',
}

export type NavigationFlyoutProps = ComponentProps<NavigationFlyoutParameters, NavigationFlyoutSlots>;

const NavigationFlyout: FC<NavigationFlyoutProps> = ({
  icon,
  backgroundColor,
  border,
  size,
  tag,
  color,
  weight,
  font,
  transform,
  decoration,
  letterSpacing,
  alignment,
  component,
  context,
  slots,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openFlyout = useCallback(() => setIsOpen(true), []);
  const closeFlyout = useCallback(() => setIsOpen(false), []);

  const hasRightContent = useMemo(
    () => Boolean(component.slots?.navigationFlyoutRightContent?.length),
    [component.slots]
  );

  const [resolvedImage] = resolveAsset(icon);
  const { url, title = '' } = resolvedImage || {};

  return (
    <div className="relative" onMouseLeave={closeFlyout}>
      <button
        onMouseEnter={openFlyout}
        className={cn('flex items-center gap-x-2', {
          [`text-${color}`]: !!color,
        })}
      >
        <BaseIconLabel
          icon={url && <BaseImage src={url} alt={title} fill />}
          {...{ size, tag, color, weight, font, transform, decoration, letterSpacing, alignment }}
        >
          <UniformText placeholder="Text goes here" parameterId="text" component={component} context={context} />
        </BaseIconLabel>
        <div
          className={cn('transition transform hidden md:block', {
            'rotate-180': isOpen,
            'rotate-0': !isOpen,
          })}
        >
          <ChevronDownIcon />
        </div>
      </button>

      <div className="hidden md:block">
        <NavigationFlyoutPropsDesktopContent
          hasRightContent={hasRightContent}
          isOpen={isOpen}
          {...{ backgroundColor, context, slots, border, component }}
        />
      </div>

      <div className="block md:hidden">
        <NavigationFlyoutPropsMobileContent
          onClose={closeFlyout}
          isOpen={isOpen}
          {...{ backgroundColor, context, slots, border, component }}
        />
      </div>
    </div>
  );
};

export default withPlaygroundWrapper(NavigationFlyout);
