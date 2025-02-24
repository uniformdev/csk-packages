import { FC } from 'react';
import { flattenValues, LinkParamValue } from '@uniformdev/canvas';
import BaseButton, { ButtonVariant } from '@/components/ui/Button';
import BaseText from '@/components/ui/Text';
import { formatUniformLink } from '@/utils/routing';
import { cn } from '@/utils/styling';
import { BreadcrumbLink, BreadcrumbsProps } from '.';
import { getSeparator } from './helpers';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ separator, links, size, color, font, transform }) => {
  const itemToDisplay =
    links?.reduce<BreadcrumbLink[]>((acc, linkItem) => {
      const { title, link } = (flattenValues(linkItem) as { title?: string; link?: LinkParamValue } | undefined) || {};
      return title ? [...acc, { title, link: formatUniformLink(link) }] : acc;
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
