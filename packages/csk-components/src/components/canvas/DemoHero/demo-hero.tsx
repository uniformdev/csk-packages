import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { DemoHeroVariants, FixedHeroProps, FlexibleHeroProps } from '.';
import { BaseHeroButton, BaseHeroImage, BaseHeroText } from './atoms';
import { ColumnsVariant } from './columns-variant';
import { DefaultVariant } from './default-variant';
import { getButtonAlignmentClass, getTextAlignmentClass } from './style-utils';
import { cleanUpPrefix } from './utils';

export const DemoHero: FC<(FixedHeroProps | FlexibleHeroProps) & { isFlexibleHero?: boolean }> = ({
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
  imageContrastBaseColor,
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
  fitHeight,
  height,
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
      <BaseHeroText
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
      <BaseHeroText
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
      <BaseHeroText
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
      <BaseHeroButton
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

  const variantProps = {
    variant,
    backgroundColor,
    spacing,
    border,
    fluidContent,
    fullHeight,
    fitHeight,
    height,
    textAlignmentClass: getTextAlignmentClass({ contentAlignment }),
    buttonAlignmentClass: getButtonAlignmentClass({ contentAlignment }),
    demoHeroMedia: (
      <>
        <BaseHeroImage
          image={image}
          {...cleanUpPrefix(
            {
              imageWidth,
              imageHeight,
              imageObjectFit,
              imageOverlayColor,
              imageContrastBaseColor,
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
    ),
    demoHeroContent: demoHeroContent,
    demoHeroCTA: demoHeroCTA,
  };

  switch (variant) {
    case DemoHeroVariants.Columns:
    case DemoHeroVariants.ColumnsReverse:
      return <ColumnsVariant {...variantProps} />;
    default:
      return <DefaultVariant {...variantProps} />;
  }
};
