import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc/component';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import { resolveAsset } from '@/utils/assets';
import { NavigationFlyoutProps } from '.';
import { NavigationFlyoutPropsDesktopContent } from './desktop';
import { getButtonClasses } from './style-utils';

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
  const hasRightContent = !!component.slots?.navigationFlyoutRightContent?.length;

  const [resolvedImage] = resolveAsset(icon);
  const { url, title = '' } = resolvedImage || {};

  return (
    <div className="group">
      <button className={getButtonClasses({ color })}>
        <BaseIconLabel
          icon={url && <BaseImage src={url} alt={title} fill />}
          {...{ size, tag, color, weight, font, transform, decoration, letterSpacing, alignment }}
        >
          <UniformText placeholder="Text goes here" parameterId="text" component={component} context={context} />
        </BaseIconLabel>
      </button>

      <div className="hidden lg:block">
        <NavigationFlyoutPropsDesktopContent
          hasRightContent={hasRightContent}
          {...{ backgroundColor, context, slots, border, component }}
        />
      </div>
    </div>
  );
};
