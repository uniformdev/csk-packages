'use client';

import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ComponentParameter, UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import { IconLabel as BaseIconLabel, Image as BaseImage, InlineSVG } from '@uniformdev/csk-components/components/ui';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import { cn, resolveViewPort } from '@uniformdev/csk-components/utils/styling';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import locales from '@/i18n/locales.json';
import { LocaleLinkProps, LocaleLinkParameters } from '.';

const LocaleLink: FC<LocaleLinkProps & LocaleLinkParameters> = ({
  icon,
  size,
  localeCode,
  tag,
  color,
  weight,
  font,
  transform,
  decoration,
  letterSpacing,
  alignment,
  component,
  hoverEffect = '',
  className,
  parameters,
}) => {
  const locale = useLocale();
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

  const href = `${pathname.replace(locale, localeCode || locales.defaultLocale)}${searchParams?.size ? `?${searchParams.toString()}` : ''}`;

  return (
    <a className="cursor-pointer hover:underline" href={href}>
      <BaseIconLabel
        icon={renderUrl()}
        className={cn('group', className)}
        iconClassName={actionClassName}
        textClassName={actionClassName}
        {...{ size, tag, color, weight, font, transform, decoration, letterSpacing, alignment }}
      >
        <UniformText
          placeholder="Text goes here"
          parameter={parameters?.text as ComponentParameter<string>}
          className="whitespace-nowrap"
          component={component}
        />
      </BaseIconLabel>
    </a>
  );
};

export default withFlattenParameters(LocaleLink);
