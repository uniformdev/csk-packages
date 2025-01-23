import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@uniformdev/theme-pack/components/canvas';
import { ButtonVariant } from '@uniformdev/theme-pack/components/ui';
import { FixedHero } from './fixed-hero';
import { FlexibleHero } from './flexible-hero';
import { PrefixedKeys } from './utils';
import { ButtonParameters } from '../Button';
import { ImageParameters as BaseImageParameters } from '../Image';
import { TextParameters } from '../Text';

export enum ContentAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type EyebrowTitleTextParameters = PrefixedKeys<TextParameters, 'eyebrowTitle'>;
export type TitleTextParameters = PrefixedKeys<TextParameters, 'title'>;
export type DescriptionTextParameters = PrefixedKeys<TextParameters, 'description'>;
export type PrimaryButtonParameters = PrefixedKeys<ButtonParameters, 'primaryButton'> & {
  primaryButtonVariant?: ButtonVariant;
};
export type SecondaryButtonParameters = PrefixedKeys<ButtonParameters, 'secondaryButton'> & {
  secondaryButtonVariant?: ButtonVariant;
};

export type ImageParameters = PrefixedKeys<Omit<BaseImageParameters, 'image'>, 'image'> &
  Pick<BaseImageParameters, 'image'>;

export type DemoHeroParameters = ContainerParameters & {
  contentAlignment?: ContentAlignment;
} & EyebrowTitleTextParameters &
  TitleTextParameters &
  DescriptionTextParameters &
  PrimaryButtonParameters &
  SecondaryButtonParameters &
  ImageParameters;

export enum DemoHeroVariants {
  Columns = 'columns',
  ColumnsReverse = 'columnsReverse',
}

export enum FlexibleHeroSlots {
  FlexibleHeroContent = 'flexibleHeroContent',
  FlexibleHeroCta = 'flexibleHeroCta',
}

export type DemoHeroProps = ComponentProps<DemoHeroParameters, FlexibleHeroSlots>;

const DemoHero = { FixedHero, FlexibleHero };
export default DemoHero;
export { FlexibleHeroEmptyPlaceholder } from './empty-placeholder';
