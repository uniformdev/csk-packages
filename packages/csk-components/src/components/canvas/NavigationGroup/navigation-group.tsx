'use client';

import { FC, useCallback, useState } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc/component';
import { ChevronDownIcon } from '@/components/ui/_icons';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import { resolveAsset } from '@/utils/assets';
import { NavigationGroupProps } from '.';
import { NavigationGroupDesktopContent } from './desktop';
import { NavigationGroupMobileContent } from './mobile';
import { getButtonClasses, getChevronClasses } from './style-utils';

export const NavigationGroup: FC<NavigationGroupProps> = ({
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

  const [resolvedImage] = resolveAsset(icon);
  const { url, title = '' } = resolvedImage || {};

  return (
    <div className="relative" onMouseLeave={closeFlyout}>
      <button onMouseEnter={openFlyout} onClick={openFlyout} className={getButtonClasses({ color })}>
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
        <NavigationGroupDesktopContent isOpen={isOpen} {...{ backgroundColor, context, slots, border }} />
      </div>

      <div className="block md:hidden">
        <NavigationGroupMobileContent onClose={closeFlyout} isOpen={isOpen} {...{ backgroundColor, context, slots }} />
      </div>
    </div>
  );
};
