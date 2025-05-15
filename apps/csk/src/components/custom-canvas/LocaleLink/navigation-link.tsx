'use client';

import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { UniformText } from '@uniformdev/canvas-next-rsc/component';
import { IconLabel as BaseIconLabel, Image as BaseImage, InlineSVG } from '@uniformdev/csk-components/components/ui';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import { cn, resolveViewPort } from '@uniformdev/csk-components/utils/styling';
import { Link, usePathname } from '@/i18n/navigation';
import { LocaleLinkProps } from '.';

export const LocaleLink: FC<LocaleLinkProps> = ({
  icon,
  localeCode,
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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [resolvedImage] = resolveAsset(icon);
  const { url, title = '' } = resolvedImage || {};

  const renderUrl = () => {
    if (!url) return null;

    return url.endsWith('.svg') ? <InlineSVG src={url} alt={title} fill /> : <BaseImage src={url} alt={title} fill />;
  };

  const actionClassName = cn('transition-all duration-150', {
    [resolveViewPort(hoverEffect, 'group-hover:{value}')]: !!hoverEffect,
    [resolveViewPort(hoverEffect, '{value}')]: !!hoverEffect,
  });

  return (
    <Link
      className="cursor-pointer hover:underline"
      locale={localeCode}
      key={localeCode}
      href={{
        pathname,
        query: Object.fromEntries(searchParams.entries()),
      }}
    >
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
    </Link>
  );
};
