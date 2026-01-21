import { FC } from 'react';
import { ComponentParameter, UniformText } from '@uniformdev/next-app-router/component';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import InlineSVG from '@/components/ui/InlineSVG';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { formatUniformLink, isExternalLink } from '@/utils/routing';
import { cn, resolveViewPort } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { NavigationLinkProps, NavigationLinkParameters } from '.';
import { Wrapper } from './wrapper';

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
          parameter={parameters.text as ComponentParameter<string>}
          className="whitespace-nowrap"
          component={component}
        />
      </BaseIconLabel>
    </Wrapper>
  );
};

export default withFlattenParameters(NavigationLink);
