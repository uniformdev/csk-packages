import { FC } from 'react';
import { DemoHeroProps } from '.';
import { DemoHero } from './demo-hero';

export const FixedHero: FC<DemoHeroProps> = props => (
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
      desktop: '5xl',
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
    imageContrastBaseColor={!props.component.variant ? props.titleColor : undefined}
    imageOverlayOpacity="0.3"
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
