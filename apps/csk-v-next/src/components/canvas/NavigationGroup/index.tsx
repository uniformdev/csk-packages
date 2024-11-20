'use client';

import { FC, useCallback, useState } from 'react';
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
import { NavigationGroupDesktopContent } from './desktop';
import { NavigationGroupMobileContent } from './mobile';

export type NavigationGroupParameters = BaseTextParameters & {
  icon?: Asset[];
  link?: LinkParamValue;
  backgroundColor?: string;
  border?: string | ViewPort<string>;
};

enum NavigationGroupSlots {
  Links = 'links',
}

export type NavigationGroupProps = ComponentProps<NavigationGroupParameters, NavigationGroupSlots>;

const NavigationGroup: FC<NavigationGroupProps> = ({
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
      <button
        onMouseEnter={openFlyout}
        onClick={openFlyout}
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
        <NavigationGroupDesktopContent isOpen={isOpen} {...{ backgroundColor, context, slots, border }} />
      </div>

      <div className="block md:hidden">
        <NavigationGroupMobileContent onClose={closeFlyout} isOpen={isOpen} {...{ backgroundColor, context, slots }} />
      </div>
    </div>
  );
};

export default withPlaygroundWrapper(NavigationGroup);
