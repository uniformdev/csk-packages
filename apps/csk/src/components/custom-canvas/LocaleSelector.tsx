//? if (localization) {
'use client';

import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import {
  Accordion,
  AccordionItem,
  Container,
  TextProps as BaseTextProps,
  Text,
} from '@uniformdev/csk-components/components/ui';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';
import { SpaceType } from '@uniformdev/csk-components/types/cskTypes';
import locales from '@/i18n/locales.json';
import { Link, usePathname } from '@/i18n/navigation';

export enum LocaleSelectorVariant {
  OnlyIcons = 'onlyIcons',
  OnlyCodes = 'onlyCodes',
}

type LocaleSelectorProps = ComponentProps<{
  accordionItemBackgroundColor?: string;
  accordionItemSpacing?: SpaceType | ViewPort<SpaceType>;
  accordionItemBorder?: string | ViewPort<string>;
  accordionItemSize?: BaseTextProps['size'];
  accordionItemColor?: string;
  accordionItemWeight?: BaseTextProps['weight'];
  accordionItemFont?: string;
  accordionItemAlignment?: BaseTextProps['alignment'];
  accordionItemTransform?: BaseTextProps['transform'];
  accordionItemDecoration?: BaseTextProps['decoration'];
  accordionItemLetterSpacing?: BaseTextProps['letterSpacing'];

  localeItemColor?: string;
  localeItemSize?: BaseTextProps['size'];
  localeItemWeight?: BaseTextProps['weight'];
  localeItemFont?: string;
  localeItemTransform?: BaseTextProps['transform'];
  localeItemDecoration?: BaseTextProps['decoration'];
  localeItemLetterSpacing?: BaseTextProps['letterSpacing'];
  localeItemAlignment?: BaseTextProps['alignment'];
  localeItemBackgroundColor?: string;
  localeItemBorder?: string | ViewPort<string>;
  localeItemSpacing?: SpaceType | ViewPort<SpaceType>;
}>;

export const LocaleSelector: FC<LocaleSelectorProps> = ({
  accordionItemBackgroundColor,
  accordionItemSpacing,
  accordionItemBorder,
  accordionItemSize,
  accordionItemColor,
  accordionItemWeight,
  accordionItemFont,
  accordionItemAlignment,
  accordionItemTransform,
  accordionItemDecoration,
  accordionItemLetterSpacing,

  localeItemColor,
  localeItemSize,
  localeItemWeight,
  localeItemFont,
  localeItemTransform,
  localeItemDecoration,
  localeItemLetterSpacing,
  localeItemAlignment,
  localeItemBackgroundColor,
  localeItemBorder,
  localeItemSpacing,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();

  const localesToDisplay = Object.entries(locales.localeNames)
    .filter(([key]) => key !== currentLocale)
    .map(([key, value]) => ({
      label: value,
      value: key,
      group: locales.localeGroups[key as keyof typeof locales.localeGroups],
    }));

  const regions = new Set(localesToDisplay.map(locale => locale.group));

  return (
    <Accordion
      className="gap-4"
      accordionItems={Array.from(regions).map(region => {
        const regionLocales = localesToDisplay.filter(locale => locale.group === region);

        return (
          <AccordionItem
            {...{
              backgroundColor: accordionItemBackgroundColor,
              spacing: accordionItemSpacing,
              border: accordionItemBorder,
            }}
            key={region}
            text={
              <Text
                {...{
                  color: accordionItemColor,
                  size: accordionItemSize,
                  weight: accordionItemWeight,
                  font: accordionItemFont,
                  transform: accordionItemTransform,
                  decoration: accordionItemDecoration,
                  letterSpacing: accordionItemLetterSpacing,
                  alignment: accordionItemAlignment,
                }}
              >
                {region || 'Unknown'}
              </Text>
            }
            accordionItemContent={
              <Container
                className="flex flex-col gap-4 px-2 py-4"
                {...{
                  backgroundColor: localeItemBackgroundColor,
                  spacing: localeItemSpacing,
                  border: localeItemBorder,
                }}
              >
                {regionLocales.map(locale => (
                  <Text
                    {...{
                      color: localeItemColor,
                      size: localeItemSize,
                      weight: localeItemWeight,
                      font: localeItemFont,
                      transform: localeItemTransform,
                      decoration: localeItemDecoration,
                      letterSpacing: localeItemLetterSpacing,
                      alignment: localeItemAlignment,
                    }}
                    key={locale.value}
                  >
                    <Link
                      className="cursor-pointer hover:underline"
                      locale={locale.value}
                      key={locale.value}
                      href={{
                        pathname,
                        query: Object.fromEntries(searchParams.entries()),
                      }}
                    >
                      {locale.label}
                    </Link>
                  </Text>
                ))}
              </Container>
            }
          />
        );
      })}
    />
  );
};

export default LocaleSelector;
//? }
