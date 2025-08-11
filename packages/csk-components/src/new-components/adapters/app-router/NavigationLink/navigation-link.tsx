import { FC } from 'react';
import { ComponentParameter, UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import { NavigationLinkParameters } from '@/new-components/canvas/NavigationLink';
import BaseIconLabel from '@/new-components/ui/IconLabel';
import BaseImage from '@/new-components/ui/Image';
import InlineSVG from '@/new-components/ui/InlineSVG';
import NavigationLinkWrapper from '@/new-components/ui/NavigationLinkWrapper';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { formatUniformLink, isExternalLink } from '@/utils/routing';
import { cn, resolveViewPort } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { NavigationLinkProps } from '.';

const NavigationLink: FC<NavigationLinkProps & ReplaceFieldsWithAssets<NavigationLinkParameters, 'icon'>> = ({
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
  parameters,
}) => {
  const href = formatUniformLink(link);
  const isActive = !activeState && context.pageState.routePath === href;

  const [resolvedImage] = icon || [];
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
        <UniformText
          placeholder="Text goes here"
          parameter={parameters.text as ComponentParameter<string>}
          className="whitespace-nowrap"
          component={component}
        />
      </BaseIconLabel>
    </NavigationLinkWrapper>
  );
};

export default withFlattenParameters(NavigationLink);
