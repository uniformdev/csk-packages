'use client';

import { FC, ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { ComponentInstance, flattenValues } from '@uniformdev/canvas';
import { ComponentParameter, UniformText } from '@uniformdev/next-app-router/component';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { cn, resolveViewPort } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { NavigationFlyoutPropsDesktopContent } from './desktop';
import { NavigationFlyoutPropsMobileContent } from './mobile';
import { getButtonClasses, getCaretClasses } from './style-utils';
import { NavigationFlyoutSlots } from './types';
import type { MegaMenuCategory, NavigationFlyoutParameters, NavigationFlyoutProps } from './types';
import { useAnchorBottom } from './use-anchor-bottom';

type NavigationFlyoutClientProps = NavigationFlyoutProps &
  Omit<ReplaceFieldsWithAssets<NavigationFlyoutParameters, 'caretIcon'>, 'icon'> & {
    icon: ReactNode | null;
    slotData?: Record<string, ComponentInstance[]>;
  };

const OPEN_DELAY_MS = 80;
const CLOSE_DELAY_MS = 150;
const NAVIGATION_MEGA_CATEGORY_TYPE = 'navigationMegaCategory';

const NavigationFlyoutClient: FC<NavigationFlyoutClientProps> = ({
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
  variant,
  slotData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const anchorBottom = useAnchorBottom(wrapperRef);

  const categories = useMemo<MegaMenuCategory[]>(() => {
    const items = slotData?.[NavigationFlyoutSlots.NavigationFlyoutLeftContent];
    if (!items?.length) return [];
    return items
      .filter(item => item?.type === NAVIGATION_MEGA_CATEGORY_TYPE)
      .map(item => ({
        ...(flattenValues(item) as { text?: string }),
        id: item._id ?? '',
      }));
  }, [slotData]);

  const [hoveredCategoryId, setHoveredCategoryId] = useState<string>();
  const activeCategoryId =
    (hoveredCategoryId && categories.find(c => c.id === hoveredCategoryId)?.id) ?? categories[0]?.id ?? '';
  const onCategoryHover = useCallback((id: string) => setHoveredCategoryId(id), []);

  const clearOpenTimer = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
  };
  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openFlyout = useCallback(() => {
    clearCloseTimer();
    if (openTimer.current) return;
    openTimer.current = setTimeout(() => {
      setIsOpen(true);
      openTimer.current = null;
    }, OPEN_DELAY_MS);
  }, []);

  const closeFlyout = useCallback(() => {
    clearOpenTimer();
    if (closeTimer.current) return;
    closeTimer.current = setTimeout(() => {
      setIsOpen(false);
      closeTimer.current = null;
    }, CLOSE_DELAY_MS);
  }, []);

  const closeImmediate = useCallback(() => {
    clearOpenTimer();
    clearCloseTimer();
    setIsOpen(false);
  }, []);

  useEffect(
    () => () => {
      clearOpenTimer();
      clearCloseTimer();
    },
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeImmediate();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, closeImmediate]);

  const hasRightContent = useMemo(
    () =>
      Boolean(
        slots?.navigationFlyoutRightContent?.items?.filter(item => !item?._id.startsWith('placeholder_'))?.length
      ),
    [slots]
  );

  const actionClassName = cn('transition-all duration-150', {
    [resolveViewPort(hoverEffect, 'group-hover:{value}')]: !!hoverEffect,
  });

  const [resolvedCaretIcon] = caretIcon || [];
  const { url: caretUrl, title: caretTitle = '' } = resolvedCaretIcon || {};

  const buttonClasses = getButtonClasses({ color });

  return (
    <div ref={wrapperRef} className="relative" onMouseLeave={closeFlyout}>
      <button
        onMouseEnter={openFlyout}
        className={buttonClasses.className}
        style={buttonClasses.style}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
      >
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
        <NavigationFlyoutPropsDesktopContent
          hasRightContent={hasRightContent}
          isOpen={isOpen}
          variant={variant}
          onClose={closeImmediate}
          onPanelMouseEnter={openFlyout}
          onPanelMouseLeave={closeFlyout}
          menuId={menuId}
          anchorBottom={anchorBottom}
          categories={categories}
          activeCategoryId={activeCategoryId}
          onCategoryHover={onCategoryHover}
          {...{ backgroundColor, context, slots, border, component }}
        />
      </div>

      <div className="block md:hidden">
        <NavigationFlyoutPropsMobileContent
          onClose={closeImmediate}
          isOpen={isOpen}
          categories={categories}
          {...{ backgroundColor, context, slots, border, component }}
        />
      </div>
    </div>
  );
};

export default withFlattenParameters(NavigationFlyoutClient);
