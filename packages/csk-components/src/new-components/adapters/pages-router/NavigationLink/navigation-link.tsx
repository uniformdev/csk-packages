import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import { UniformText } from '@uniformdev/canvas-react';
import BaseIconLabel from '@/new-components/ui/IconLabel';
import BaseImage from '@/new-components/ui/Image';
import InlineSVG from '@/new-components/ui/InlineSVG';
import NavigationLinkWrapper from '@/new-components/ui/NavigationLinkWrapper';
import { resolveAsset } from '@/utils/assets';
import { checkIsCurrentRoute, formatUniformLink, isExternalLink } from '@/utils/routing';
import { cn, resolveViewPort } from '@/utils/styling';
import { NavigationLinkProps } from '.';

const NavigationLink: FC<NavigationLinkProps> = ({
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
  hoverEffect = '',
  className,
}) => {
  const href = formatUniformLink(link);
  const router = useRouter();
  const isCurrentRoute = useMemo(() => checkIsCurrentRoute(router, link), [router, link]);
  const isActive = activeState && isCurrentRoute;

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
    <NavigationLinkWrapper href={href} isExternalLink={isExternalLink(href)}>
      <BaseIconLabel
        icon={renderUrl()}
        className={cn('group', className)}
        iconClassName={actionClassName}
        textClassName={actionClassName}
        {...{ size, tag, color, weight, font, transform, decoration, letterSpacing, alignment }}
      >
        <UniformText placeholder="Text goes here" parameterId="text" className="whitespace-nowrap" />
      </BaseIconLabel>
    </NavigationLinkWrapper>
  );
};

export default NavigationLink;
