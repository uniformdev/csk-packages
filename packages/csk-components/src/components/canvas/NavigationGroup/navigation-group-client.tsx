'use client';

import { FC, ReactNode, useCallback, useState } from 'react';
import { ComponentParameter, UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { cn, resolveViewPort } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { NavigationGroupParameters, NavigationGroupProps } from '.';
import { NavigationGroupDesktopContent } from './desktop';
import { NavigationGroupMobileContent } from './mobile';
import { getButtonClasses, getCaretClasses } from './style-utils';

type NavigationGroupClientProps = NavigationGroupProps &
  Omit<ReplaceFieldsWithAssets<NavigationGroupParameters, 'caretIcon'>, 'icon'> & {
    icon: ReactNode | null;
  };

const NavigationGroupClient: FC<NavigationGroupClientProps> = ({
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
  parameters,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openFlyout = useCallback(() => setIsOpen(true), []);
  const closeFlyout = useCallback(() => setIsOpen(false), []);

  const actionClassName = cn('transition-all duration-150', {
    [resolveViewPort(hoverEffect, 'group-hover:{value}')]: !!hoverEffect,
  });

  const [resolvedCaretIcon] = caretIcon || [];
  const { url: caretUrl, title: caretTitle = '' } = resolvedCaretIcon || {};

  return (
    <div className="relative" onMouseLeave={closeFlyout}>
      <button onMouseEnter={openFlyout} onClick={openFlyout} className={getButtonClasses({ color })}>
        <BaseIconLabel
          icon={icon}
          className={cn('group', className)}
          iconClassName={actionClassName}
          textClassName={actionClassName}
          {...{ size, tag, color, weight, font, transform, decoration, letterSpacing, alignment }}
        >
          <UniformText
            placeholder="Text goes here"
            parameter={parameters.text as ComponentParameter<string>}
            component={component}
          />
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

export default withFlattenParameters(NavigationGroupClient);
