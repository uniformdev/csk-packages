'use client';

import { FC, useCallback, useMemo, useState } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc/component';
import { ChevronDownIcon } from '@/components/ui/_icons';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import { resolveAsset } from '@/utils/assets';
import { NavigationFlyoutProps } from '.';
import { NavigationFlyoutPropsDesktopContent } from './desktop';
import { NavigationFlyoutPropsMobileContent } from './mobile';
import { getButtonClasses, getChevronClasses } from './style-utils';

export const NavigationFlyout: FC<NavigationFlyoutProps> = ({
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
      <button onMouseEnter={openFlyout} className={getButtonClasses({ color })}>
        <BaseIconLabel
          icon={url && <BaseImage src={url} alt={title} fill />}
          {...{ size, tag, color, weight, font, transform, decoration, letterSpacing, alignment }}
        >
          <UniformText placeholder="Text goes here" parameterId="text" component={component} context={context} />
        </BaseIconLabel>
        <div className={getChevronClasses({ isOpen })}>
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
