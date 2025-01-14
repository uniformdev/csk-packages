import { FC } from 'react';
import { flattenValues, LinkParamValue } from '@uniformdev/canvas';
import { Button as BaseButton, ButtonVariant, Text as BaseText } from '@uniformdev/theme-pack/components/ui';
import { formatUniformLink } from '@uniformdev/theme-pack/utils/routing';
import { cn } from '@uniformdev/theme-pack/utils/styling';
import { BreadcrumbLink, BreadcrumbsProps } from '.';
import { getSeparator } from './helpers';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ separator, links, size, color, font, transform }) => {
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
