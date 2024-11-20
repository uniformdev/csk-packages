import { FC } from 'react';
import { DataWithProperties, flattenValues, LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { getSeparator } from '@/components/canvas/Breadcrumbs/helpers';
import { TextParameters } from '@/components/canvas/Text';
import BaseButton, { ButtonVariant } from '@/components/ui/Button';
import BaseText from '@/components/ui/Text';
import { withPlaygroundWrapper } from '@/hocs';
import { cn, formatUniformLink } from '@/utils';

export type BreadcrumbLink = {
  title: string;
  link?: string;
};

export type BreadcrumbsParameters = {
  title?: string;
  separator?: 'slash' | 'chevron';
  links?: DataWithProperties[];
};

type BreadcrumbsProps = ComponentProps<
  BreadcrumbsParameters & Pick<TextParameters, 'size' | 'color' | 'font' | 'transform'>
>;

const Breadcrumbs: FC<BreadcrumbsProps> = ({ separator, links, size, color, font, transform }) => {
  const itemToDisplay =
    links?.reduce<BreadcrumbLink[]>((acc, linkItem) => {
      const { title, link } = (flattenValues(linkItem) as { title?: string; link?: LinkParamValue } | undefined) || {};
      return !!title ? [...acc, { title, link: formatUniformLink(link) }] : acc;
    }, []) || [];

  if (!itemToDisplay.length) {
    // ToDo: Add breadcrumbs placeholder
    return null;
  }

  return (
    <ul
      className={cn('flex items-center', {
        [`text-${size}`]: !!size,
        [`text-${color}`]: !!color,
      })}
    >
      {itemToDisplay.map(({ title, link }, index) => (
        <li className="flex items-center" key={`${title}-${index}`}>
          {!!index && <div className="mx-2 size-[1em]">{getSeparator(separator)}</div>}
          {!link ? (
            <BaseText size={size} font={font} color={color} transform={transform}>
              {title}
            </BaseText>
          ) : (
            <BaseButton
              variant={ButtonVariant.Link}
              textColor={color}
              className={cn({
                [`font-${font}`]: !!font,
                [`text-${size}`]: !!size,
                [transform || '']: !!transform,
              })}
              href={link}
            >
              {title}
            </BaseButton>
          )}
        </li>
      ))}
    </ul>
  );
};

export default withPlaygroundWrapper(Breadcrumbs);
