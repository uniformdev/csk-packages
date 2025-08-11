import { FC } from 'react';
import { SlotDefinition } from '@uniformdev/canvas-next-rsc-shared-v2';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import {
  DemoHeroVariants,
  FixedHeroParameters,
  FlexibleHeroParameters,
  FlexibleHeroSlots,
} from '@/new-components/canvas/DemoHero';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { FixedHeroProps, FlexibleHeroProps } from '.';
import { BaseHeroButton, BaseHeroImage, BaseHeroText } from './atoms';
import { ColumnsVariant } from './columns-variant';
import { DefaultVariant } from './default-variant';
import { getButtonAlignmentClass, getTextAlignmentClass } from './style-utils';
import { cleanUpPrefix } from './utils';

type FixedHeroComponentProps = {
  isFlexibleHero?: false;
  slots: Record<never, SlotDefinition>;
} & FixedHeroProps &
  ReplaceFieldsWithAssets<FixedHeroParameters, 'image' | 'primaryButtonIcon'>;

type FlexibleHeroComponentProps = {
  isFlexibleHero: true;
  slots: Record<FlexibleHeroSlots, SlotDefinition>;
} & FlexibleHeroProps &
  ReplaceFieldsWithAssets<FlexibleHeroParameters, 'image' | 'primaryButtonIcon'>;

export const DemoHero: FC<FixedHeroComponentProps | FlexibleHeroComponentProps> = ({
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
  imageFill,
  // Presentation Parameters
  contentAlignment,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
  isFlexibleHero,
  component,
  context,
  slots,
  variant,
  parameters,
}) => {
  const isEditorPreviewMode = context.isContextualEditing;

  const demoHeroContent = isFlexibleHero ? (
    <UniformSlot slot={slots.flexibleHeroContent} />
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
        isEditorPreviewMode={isEditorPreviewMode}
        component={component}
        parameter={parameters.eyebrowTitleText}
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
        isEditorPreviewMode={isEditorPreviewMode}
        component={component}
        parameter={parameters.titleText}
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
        isEditorPreviewMode={isEditorPreviewMode}
        component={component}
        parameter={parameters.descriptionText}
      />
    </>
  );

  const demoHeroCTA = isFlexibleHero ? (
    <UniformSlot slot={slots.flexibleHeroCta} />
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
        isEditorPreviewMode={isEditorPreviewMode}
        component={component}
        parameter={parameters.primaryButtonText}
      />
    </>
  );

  const variantProps = {
    backgroundColor,
    spacing,
    border,
    fluidContent,
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
              imageFill,
            },
            'image'
          )}
          component={component}
          isEditorPreviewMode={isEditorPreviewMode}
          variant={variant}
        />
      </>
    ),
    demoHeroContent: demoHeroContent,
    demoHeroCTA: demoHeroCTA,
  };

  switch (variant) {
    case DemoHeroVariants.Columns:
    case DemoHeroVariants.ColumnsReverse:
      return <ColumnsVariant variant={variant} {...variantProps} />;
    default:
      return <DefaultVariant {...variantProps} />;
  }
};
