'use client';

import { FC, useContext } from 'react';
import { ComponentParameter, UniformSlot, UniformText } from '@uniformdev/next-app-router/component';
import { MegaMenuContext } from '@/components/canvas/NavigationFlyout/mega-menu-context';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import InlineSVG from '@/components/ui/InlineSVG';
import BaseLink from '@/components/ui/Link';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { formatUniformLink, isExternalLink } from '@/utils/routing';
import { cn, resolveViewPort } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { NavigationMegaCategoryParameters, NavigationMegaCategoryProps, NavigationMegaCategorySlots } from '.';

type NavigationMegaCategoryClientProps = NavigationMegaCategoryProps &
  ReplaceFieldsWithAssets<NavigationMegaCategoryParameters, 'icon' | 'caretIcon'>;

const NavigationMegaCategoryClient: FC<NavigationMegaCategoryClientProps> = ({
  icon,
  link,
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
  hoverEffect = '',
  className,
  parameters,
  slots,
}) => {
  const { isInsideCategorizedMegaMenu } = useContext(MegaMenuContext);

  if (isInsideCategorizedMegaMenu) {
    return <UniformSlot slot={slots[NavigationMegaCategorySlots.CategoryPanel]} />;
  }

  const href = formatUniformLink(link);
  const actionClassName = cn('transition-all duration-150', {
    [resolveViewPort(hoverEffect, 'group-hover:{value}')]: !!hoverEffect,
  });

  const [resolvedIcon] = icon || [];
  const { url: iconUrl, title: iconTitle = '' } = resolvedIcon || {};
  const iconNode = iconUrl ? (
    iconUrl.endsWith('.svg') ? (
      <InlineSVG src={iconUrl} alt={iconTitle} fill />
    ) : (
      <BaseImage src={iconUrl} alt={iconTitle} fill />
    )
  ) : null;

  const content = (
    <BaseIconLabel
      icon={iconNode}
      className={cn('group', className)}
      iconClassName={actionClassName}
      textClassName={actionClassName}
      {...{ size, tag, color, weight, font, transform, decoration, letterSpacing, alignment }}
    >
      <UniformText
        placeholder="Text goes here"
        parameter={parameters.text as ComponentParameter<string>}
        className="whitespace-nowrap"
        component={component}
      />
    </BaseIconLabel>
  );

  if (!href) return <div className="cursor-pointer">{content}</div>;

  const external = isExternalLink(href);
  return (
    <BaseLink
      className="cursor-pointer hover:no-underline"
      link={href}
      openInNewTab={external}
      rel={external ? 'noopener noreferrer' : ''}
    >
      {content}
    </BaseLink>
  );
};

export default withFlattenParameters(NavigationMegaCategoryClient);
