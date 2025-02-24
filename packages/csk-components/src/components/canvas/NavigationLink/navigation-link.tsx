import { FC } from 'react';
import { UniformText } from '@uniformdev/canvas-next-rsc/component';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import { resolveAsset } from '@/utils/assets';
import { formatUniformLink, isExternalLink } from '@/utils/routing';
import { NavigationLinkProps } from '.';
import { getBaseIconLabelClasses } from './style-utils';
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
}) => {
  const href = formatUniformLink(link);

  const [resolvedImage] = resolveAsset(icon);
  const { url, title = '' } = resolvedImage || {};

  return (
    <Wrapper href={href} isExternalLink={isExternalLink(href)}>
      <BaseIconLabel
        textClassName={getBaseIconLabelClasses({ activeState, context, href })}
        icon={url && <BaseImage src={url} alt={title} fill />}
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
