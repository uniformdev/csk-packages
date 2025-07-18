'use client';

import { FC, useCallback, useState } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc/component';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import InlineSVG from '@/components/ui/InlineSVG';
import { resolveAsset } from '@/utils/assets';
import { cn, resolveViewPort } from '@/utils/styling';
import { NavigationGroupProps } from '.';
import { NavigationGroupDesktopContent } from './desktop';
import { NavigationGroupMobileContent } from './mobile';
import { getButtonClasses, getCaretClasses } from './style-utils';

export const NavigationGroup: FC<NavigationGroupProps> = ({
  icon,
  caretIcon,
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
  hoverEffect = '',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openFlyout = useCallback(() => setIsOpen(true), []);
  const closeFlyout = useCallback(() => setIsOpen(false), []);

  const [resolvedImage] = resolveAsset(icon);
  const { url, title = '' } = resolvedImage || {};

  const renderUrl = () => {
    if (!url) return null;

    return url.endsWith('.svg') ? <InlineSVG src={url} alt={title} fill /> : <BaseImage src={url} alt={title} fill />;
  };

  const actionClassName = cn('transition-all duration-150', {
    [resolveViewPort(hoverEffect, 'group-hover:{value}')]: !!hoverEffect,
  });

  const [resolvedCaretIcon] = resolveAsset(caretIcon);
  const { url: caretUrl, title: caretTitle = '' } = resolvedCaretIcon || {};

  return (
    <div className="relative" onMouseLeave={closeFlyout}>
      <button onMouseEnter={openFlyout} onClick={openFlyout} className={getButtonClasses({ color })}>
        <BaseIconLabel
          icon={renderUrl()}
          className={cn('group', className)}
          iconClassName={actionClassName}
          textClassName={actionClassName}
          {...{ size, tag, color, weight, font, transform, decoration, letterSpacing, alignment }}
        >
          <UniformText placeholder="Text goes here" parameterId="text" component={component} context={context} />
        </BaseIconLabel>
        {caretUrl && (
          <div
            className={cn('relative size-[1em]', getCaretClasses({ isOpen }), {
              [`text-${size}`]: !!size,
            })}
          >
            <BaseImage src={caretUrl} alt={caretTitle} fill />
          </div>
        )}
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
