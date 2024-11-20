import { FC, Fragment, ReactNode } from 'react';
import Link from 'next/link';
import { Asset } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps, UniformText } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters as BaseTextParameters } from '@/components/canvas/Text';
import BaseIconLabel from '@/components/ui/IconLabel';
import BaseImage from '@/components/ui/Image';
import { withPlaygroundWrapper } from '@/hocs';
import { cn, formatUniformLink, resolveAsset, resolveRouteToPath } from '@/utils';

export type NavigationLinkParameters = BaseTextParameters & {
  icon?: Asset[];
  link?: LinkParamValue;
  activeState?: boolean;
};

type NavigationLinkProps = ComponentProps<NavigationLinkParameters>;

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
  component,
  context,
}) => {
  const href = formatUniformLink(link);

  const [resolvedImage] = resolveAsset(icon);
  const { url, title = '' } = resolvedImage || {};

  const Wrapper = href ? ({ children }: { children: ReactNode }) => <Link href={href}>{children}</Link> : Fragment;

  return (
    <Wrapper>
      <BaseIconLabel
        textClassName={cn('hover:underline', {
          underline: activeState && resolveRouteToPath(context.matchedRoute, context.dynamicInputs) === href,
        })}
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

export default withPlaygroundWrapper(NavigationLink);
