import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import { ButtonVariant } from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { cn } from '@/utils';
import { Button, Image, Text } from './atoms';
import { cleanUpPrefix, PrefixedKeys } from './utils';
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

enum FlexibleHeroSlots {
  FlexibleHeroContent = 'flexibleHeroContent',
  FlexibleHeroCta = 'flexibleHeroCta',
}

type DemoHeroProps = ComponentProps<DemoHeroParameters, FlexibleHeroSlots>;

const DemoHero: FC<DemoHeroProps & { isFlexibleHero?: boolean }> = ({
  // Eyebrow Text Parameters
  eyebrowTitleText,
  eyebrowTitleTag,
  eyebrowTitleSize,
  eyebrowTitleColor,
  eyebrowTitleWeight,
  eyebrowTitleFont,
  eyebrowTitleAlignment,
  eyebrowTitleTransform,
  eyebrowTitleDecoration,
  eyebrowTitleLetterSpacing,
  eyebrowTitleLineCountRestrictions,
  // Title Text Parameters
  titleText,
  titleTag,
  titleSize,
  titleColor,
  titleWeight,
  titleFont,
  titleAlignment,
  titleTransform,
  titleDecoration,
  titleLetterSpacing,
  titleLineCountRestrictions,
  // Description Text Parameters
  descriptionText,
  descriptionTag,
  descriptionSize,
  descriptionColor,
  descriptionWeight,
  descriptionFont,
  descriptionAlignment,
  descriptionTransform,
  descriptionDecoration,
  descriptionLetterSpacing,
  descriptionLineCountRestrictions,
  // Primary Button Parameters
  primaryButtonVariant,
  primaryButtonText,
  primaryButtonLink,
  primaryButtonTextColor,
  primaryButtonTextWeight,
  primaryButtonTextFont,
  primaryButtonTextTransform,
  primaryButtonButtonColor,
  primaryButtonBorder,
  primaryButtonSize,
  primaryButtonIcon,
  primaryButtonTextSize,
  primaryButtonIconPosition,
  primaryButtonHoverButtonColor,
  primaryButtonHoverTextColor,
  // Image Parameters
  image,
  imageWidth,
  imageHeight,
  imageObjectFit,
  imageOverlayColor,
  imageOverlayOpacity,
  imageBorder,
  imagePriority,
  imageUnoptimized,
  // Presentation Parameters
  contentAlignment,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,

  isFlexibleHero = false,
  component,
  context,
  slots,
}) => {
  const variant = component.variant as DemoHeroVariants | undefined;

  const demoHeroContent = isFlexibleHero ? (
    <UniformSlot data={component} context={context} slot={slots.flexibleHeroContent} />
  ) : (
    <>
      <Text
        {...cleanUpPrefix(
          {
            eyebrowTitleText,
            eyebrowTitleTag,
            eyebrowTitleSize,
            eyebrowTitleColor,
            eyebrowTitleWeight,
            eyebrowTitleFont,
            eyebrowTitleAlignment,
            eyebrowTitleTransform,
            eyebrowTitleDecoration,
            eyebrowTitleLetterSpacing,
            eyebrowTitleLineCountRestrictions,
          },
          'eyebrowTitle'
        )}
        component={component}
        context={context}
        parameterId="eyebrowTitleText"
      />
      <Text
        {...cleanUpPrefix(
          {
            titleText,
            titleTag,
            titleSize,
            titleColor,
            titleWeight,
            titleFont,
            titleAlignment,
            titleTransform,
            titleDecoration,
            titleLetterSpacing,
            titleLineCountRestrictions,
          },
          'title'
        )}
        component={component}
        context={context}
        parameterId="titleText"
      />
      <Text
        {...cleanUpPrefix(
          {
            descriptionText,
            descriptionTag,
            descriptionSize,
            descriptionColor,
            descriptionWeight,
            descriptionFont,
            descriptionAlignment,
            descriptionTransform,
            descriptionDecoration,
            descriptionLetterSpacing,
            descriptionLineCountRestrictions,
          },
          'description'
        )}
        component={component}
        context={context}
        parameterId="descriptionText"
      />
    </>
  );

  const demoHeroCTA = isFlexibleHero ? (
    <UniformSlot data={component} context={context} slot={slots.flexibleHeroCta} />
  ) : (
    <>
      <Button
        {...cleanUpPrefix(
          {
            primaryButtonVariant,
            primaryButtonText,
            primaryButtonLink,
            primaryButtonTextColor,
            primaryButtonTextWeight,
            primaryButtonTextFont,
            primaryButtonTextTransform,
            primaryButtonButtonColor,
            primaryButtonBorder,
            primaryButtonSize,
            primaryButtonIcon,
            primaryButtonTextSize,
            primaryButtonIconPosition,
            primaryButtonHoverButtonColor,
            primaryButtonHoverTextColor,
          },
          'primaryButton'
        )}
        component={component}
        context={context}
        parameterId="primaryButtonText"
      />
    </>
  );

  const demoHeroMedia = (
    <>
      <Image
        image={image}
        {...cleanUpPrefix(
          {
            imageWidth,
            imageHeight,
            imageObjectFit,
            imageOverlayColor,
            imageOverlayOpacity,
            imageBorder,
            imagePriority,
            imageUnoptimized,
          },
          'image'
        )}
        component={component}
        context={context}
      />
    </>
  );

  const textAlignment = cn('text-center', {
    'text-start': contentAlignment === ContentAlignment.Left,
    'text-end': contentAlignment === ContentAlignment.Right,
  });
  const buttonAlignment = cn('justify-center', {
    '!justify-start': contentAlignment === ContentAlignment.Left,
    '!justify-end': contentAlignment === ContentAlignment.Right,
  });

  switch (variant) {
    case DemoHeroVariants.Columns:
    case DemoHeroVariants.ColumnsReverse:
      return (
        <Container {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
          <div className={cn('grid grid-cols-1 items-center gap-4 px-4 lg:grid-cols-2 xl:px-0')}>
            <div className={cn('aspect-square', { 'order-last': variant === DemoHeroVariants.ColumnsReverse })}>
              <div className="flex size-full items-center justify-center overflow-hidden">{demoHeroMedia}</div>
            </div>
            <div className="flex flex-col justify-center gap-8">
              <div className={cn('flex flex-col gap-4', textAlignment)}>{demoHeroContent}</div>
              <div className={cn('flex flex-wrap gap-2 items-center', buttonAlignment)}>{demoHeroCTA}</div>
            </div>
          </div>
        </Container>
      );
    default:
      return (
        <Container
          className="relative overflow-hidden"
          {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}
        >
          <div className="absolute left-0 top-0 z-10 size-full overflow-hidden">{demoHeroMedia}</div>
          <Container className="relative z-20 flex flex-col gap-8">
            <div className={cn('flex flex-col gap-4', textAlignment)}>{demoHeroContent}</div>
            <div className={cn('flex flex-wrap gap-2 items-center', buttonAlignment)}>{demoHeroCTA}</div>
          </Container>
        </Container>
      );
  }
};

const FixedHero: FC<DemoHeroProps> = props => (
  <DemoHero
    {...props}
    // Eyebrow Text Parameters
    eyebrowTitleTag="span"
    eyebrowTitleSize={{
      mobile: 'xs',
      tablet: 'lg',
      desktop: 'xl',
    }}
    eyebrowTitleWeight="bold"
    eyebrowTitleTransform="uppercase"
    // Title Text Parameters
    titleSize={{
      mobile: '3xl',
      tablet: '5xl',
      desktop: '7xl',
    }}
    titleWeight="bold"
    // Description Text Parameters
    descriptionTag="p"
    descriptionSize={{
      mobile: 'sm',
      tablet: 'lg',
      desktop: 'xl',
    }}
    descriptionWeight="normal"
    // Primary Button Parameters
    primaryButtonSize="button-medium"
    primaryButtonTextSize="sm"
    primaryButtonTextColor="text-light"
    primaryButtonTextWeight="normal"
    primaryButtonButtonColor="button-primary"
    primaryButtonTextTransform="uppercase"
    primaryButtonHoverButtonColor="button-primary-hover"
    // Image Parameters
    imagePriority
    imageObjectFit="cover"
    imageUnoptimized
    // Presentation Parameters
    spacing={{
      paddingTop: 'container-xlarge',
      paddingLeft: 'container-small',
      paddingRight: 'container-small',
      paddingBottom: 'container-xlarge',
    }}
    fluidContent
    isFlexibleHero={false}
  />
);
const FlexibleHero: FC<DemoHeroProps> = props => <DemoHero {...props} isFlexibleHero={true} />;

export default { FixedHero, FlexibleHero };
