import { FC } from 'react';
import { UniformSlot, useUniformContextualEditingState } from '@uniformdev/canvas-react';
import { DemoHeroVariants, FlexibleHeroEmptyPlaceholder, FlexibleHeroSlots } from '@/new-components/canvas/DemoHero';
import { FixedHeroProps, FlexibleHeroProps } from '.';
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
  imageFill,
  // Presentation Parameters
  contentAlignment,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
  isFlexibleHero = false,
  component,
}) => {
  const { previewMode } = useUniformContextualEditingState();
  const isEditorPreviewMode = previewMode === 'editor';

  const variant = component.variant as DemoHeroVariants | undefined;

  const demoHeroContent = isFlexibleHero ? (
    <UniformSlot
      name={FlexibleHeroSlots.FlexibleHeroContent}
      emptyPlaceholder={<FlexibleHeroEmptyPlaceholder slotName={FlexibleHeroSlots.FlexibleHeroContent} />}
    />
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
        parameterId="eyebrowTitleText"
        isEditorPreviewMode={isEditorPreviewMode}
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
        parameterId="titleText"
        isEditorPreviewMode={isEditorPreviewMode}
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
        parameterId="descriptionText"
        isEditorPreviewMode={isEditorPreviewMode}
      />
    </>
  );

  const demoHeroCTA = isFlexibleHero ? (
    <UniformSlot
      name={FlexibleHeroSlots.FlexibleHeroCta}
      emptyPlaceholder={<FlexibleHeroEmptyPlaceholder slotName={FlexibleHeroSlots.FlexibleHeroCta} />}
    />
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
        parameterId="primaryButtonText"
        isEditorPreviewMode={isEditorPreviewMode}
      />
    </>
  );

  const variantProps = {
    variant,
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
