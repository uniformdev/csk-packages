import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc/component';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import InlineSVG from '@/components/ui/InlineSVG';
import { resolveAsset } from '@/utils/assets';
import { formatUniformLink, isExternalLink, resolveRouteToPath } from '@/utils/routing';
import { cn, resolveViewPort } from '@/utils/styling';
import { NavigationLinkProps } from '.';
import { Wrapper } from './wrapper';

export const NavigationLink: FC<NavigationLinkProps> = ({
  icon,
  link,
  activeState,
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
  hoverEffect = '',
  className,
}) => {
  const href = formatUniformLink(link);
  const isActive = activeState && resolveRouteToPath(context.matchedRoute, context.dynamicInputs) === href;

  const [resolvedImage] = resolveAsset(icon);
  const { url, title = '' } = resolvedImage || {};

  const renderUrl = () => {
    if (!url) return null;

    return url.endsWith('.svg') ? <InlineSVG src={url} alt={title} fill /> : <BaseImage src={url} alt={title} fill />;
  };

  const actionClassName = cn('transition-all duration-150', {
    [resolveViewPort(hoverEffect, 'group-hover:{value}')]: !!hoverEffect,
    [resolveViewPort(hoverEffect, '{value}')]: !!hoverEffect && isActive,
  });

  return (
    <Wrapper href={href} isExternalLink={isExternalLink(href)}>
      <BaseIconLabel
        icon={renderUrl()}
        className={cn('group', className)}
        iconClassName={actionClassName}
        textClassName={actionClassName}
        {...{ size, tag, color, weight, font, transform, decoration, letterSpacing, alignment }}
      >
        <UniformText
          placeholder="Text goes here"
          parameterId="text"
          className="whitespace-nowrap"
          component={component}
          context={context}
        />
      </BaseIconLabel>
    </Wrapper>
  );
};
