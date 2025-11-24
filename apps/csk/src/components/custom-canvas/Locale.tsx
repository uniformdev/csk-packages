'use client';

import { FC } from 'react';
import { useLocale } from 'next-intl';
import { AssetParamValue } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import {
  Image as BaseImage,
  IconLabel as BaseIconLabel,
  TextProps as BaseTextParameters,
  InlineSVG,
} from '@uniformdev/csk-components/components/ui';
import { ViewPort, ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import { formatUniformLink } from '@uniformdev/csk-components/utils/routing';
import { resolveViewPort } from '@uniformdev/csk-components/utils/styling';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import locales from '@/i18n/locales.json';

export enum LocaleVariant {
  OnlyIcons = 'onlyIcons',
  OnlyCodes = 'onlyCodes',
}

type LocaleParameters = Partial<BaseTextParameters> & {
  icon?: AssetParamValue;
  link?: LinkParamValue;
  activeState?: boolean;
  hoverEffect?: string | ViewPort<string>;
  className?: string;
};

type LocaleProps = ComponentProps<LocaleParameters>;

const extractEmoji = (str: string): string => {
  const match = str.match(/\p{Emoji}/gu);
  return match ? match.join('') : str;
};

const getLabel = (key: string, value: string, variant: string | undefined) => {
  if (variant === LocaleVariant.OnlyIcons) return extractEmoji(value);
  if (variant === LocaleVariant.OnlyCodes) return key.toUpperCase();
  return value;
};

export const Locale: FC<LocaleProps & LocaleParameters> = ({
  icon,
  link,
  activeState,
  size,
  color,
  weight,
  font,
  transform,
  decoration,
  letterSpacing,
  alignment,

  context,
  hoverEffect = '',
  className,
  variant,
}) => {
  const currentLocale = useLocale();

  const localesToDisplay = Object.entries(locales.localeNames).map(([key, value]) => ({
    label: value,
    value: key,
    group: locales.localeGroups[key as keyof typeof locales.localeGroups],
  }));

  const currentLocalization = localesToDisplay.find(locale => locale.value === currentLocale);

  const href = formatUniformLink(link);
  const isActive = !activeState && context.pageState.routePath === href;

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
    <BaseIconLabel
      icon={renderUrl()}
      className={cn('group cursor-pointer', className)}
      iconClassName={actionClassName}
      textClassName={actionClassName}
      {...{ size, color, weight, font, transform, decoration, letterSpacing, alignment }}
    >
      {getLabel(currentLocalization?.value ?? '', currentLocalization?.label ?? '', variant)}
    </BaseIconLabel>
  );
};

export default withFlattenParameters(Locale);
