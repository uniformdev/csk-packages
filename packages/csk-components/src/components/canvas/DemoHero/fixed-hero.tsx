import { FC } from 'react';
import { FixedHeroProps } from '.';
import { DemoHero } from './demo-hero';

const getImageOverlayOpacity = (overlayAutoTint?: string, enableOverlayAutoTint?: boolean) => {
  if (overlayAutoTint) return overlayAutoTint;
  // Cover deprecated case
  if (enableOverlayAutoTint) return '0.3';
  return undefined;
};

export const FixedHero: FC<FixedHeroProps> = ({ textColor, overlayAutoTint, enableOverlayAutoTint, ...props }) => {
  const imageOverlayOpacity = getImageOverlayOpacity(overlayAutoTint, enableOverlayAutoTint);
  return (
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
      eyebrowTitleColor={textColor || props.eyebrowTitleColor}
      // Title Text Parameters
      titleSize={{
        mobile: '3xl',
        tablet: '5xl',
        desktop: '5xl',
      }}
      titleWeight="bold"
      titleColor={textColor || props.titleColor}
      // Description Text Parameters
      descriptionTag="p"
      descriptionSize={{
        mobile: 'sm',
        tablet: 'lg',
        desktop: 'xl',
      }}
      descriptionWeight="normal"
      descriptionColor={textColor || props.descriptionColor}
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
      imageContrastBaseColor={!props.component.variant && imageOverlayOpacity ? textColor : undefined}
      imageOverlayOpacity={imageOverlayOpacity}
      // Presentation Parameters
      spacing={{
        paddingTop: 'container-xlarge',
        paddingLeft: 'container-small',
        paddingRight: 'container-small',
        paddingBottom: 'container-xlarge',
      }}
      fluidContent={!props.component.variant}
      isFlexibleHero={false}
    />
  );
};
