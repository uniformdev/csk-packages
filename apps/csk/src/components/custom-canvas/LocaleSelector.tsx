import { FC } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { Text, TextProps } from '@uniformdev/csk-components/components/ui';
import Dropdown from '@/components/custom-ui/Dropdown';
import locales from '@/i18n/locales.json';

export enum LocaleSelectorVariant {
  OnlyIcons = 'onlyIcons',
  OnlyCodes = 'onlyCodes',
}

type LocaleSelectorProps = ComponentProps<{
  size?: TextProps['size'];
  color?: string;
  backgroundColor?: string;
}>;

const extractEmoji = (str: string): string => {
  const match = str.match(/\p{Emoji}/gu);
  return match ? match.join('') : str;
};

const getLabel = (key: string, value: string, variant: string | undefined) => {
  if (variant === LocaleSelectorVariant.OnlyIcons) return extractEmoji(value);
  if (variant === LocaleSelectorVariant.OnlyCodes) return key.toUpperCase();
  return value;
};

const LocaleSelector: FC<LocaleSelectorProps> = ({ component, size, color, backgroundColor }) => {
  const currentLocale = useLocale();

  const localesToDisplay = Object.entries(locales.localeNames).map(([key, value]) => ({
    label: getLabel(key, value, component.variant),
    value: key,
  }));

  const current = localesToDisplay.find(item => item.value === currentLocale);

  const availableLocales = localesToDisplay.filter(item => item.value !== currentLocale);

  return (
    <Dropdown
      backgroundColor={backgroundColor}
      button={
        <Text size={size} color={color}>
          {current?.label ?? 'Select locale'}
        </Text>
      }
    >
      {availableLocales.map(({ value, label }) => (
        <Link locale={value} key={value} href={`/${value}`} className="block px-3 py-2">
          {label}
        </Link>
      ))}
    </Dropdown>
  );
};

export default LocaleSelector;
