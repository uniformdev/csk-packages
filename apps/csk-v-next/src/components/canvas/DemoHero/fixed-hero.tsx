import { FC } from 'react';
import { DemoHeroProps } from '.';
import { DemoHero } from './demo-hero';

export const FixedHero: FC<DemoHeroProps> = props => (
  <DemoHero
    {...props}
    // Eyebrow Text Parameters
    eyebrowTitleTag="span"
    eyebrowTitleColor="text-primary"
    eyebrowTitleSize={{
      mobile: 'xs',
      tablet: 'lg',
      desktop: 'xl',
    }}
    eyebrowTitleWeight="bold"
    eyebrowTitleTransform="uppercase"
    // Title Text Parameters
    titleColor="text-primary"
    titleSize={{
      mobile: '3xl',
      tablet: '4xl',
      desktop: '5xl',
    }}
    titleWeight="bold"
    // Description Text Parameters
    descriptionTag="p"
    descriptionColor="text-primary"
    descriptionSize={{
      mobile: 'sm',
      tablet: 'lg',
      desktop: 'xl',
    }}
    descriptionWeight="normal"
    // Primary Button Parameters
    primaryButtonSize="button-medium"
    primaryButtonTextSize="sm"
    primaryButtonTextColor="text-primary"
    primaryButtonTextWeight="normal"
    primaryButtonButtonColor="button-secondary"
    primaryButtonTextTransform="uppercase"
    primaryButtonHoverButtonColor="button-secondary-hover"
    primaryButtonHoverTextColor="text-light"
    primaryButtonBorder="border-button-secondary"
    // Image Parameters
    imagePriority
    imageObjectFit="cover"
    imageUnoptimized
    // Presentation Parameters
    spacing={{
      paddingBottom: !props.component.variant ? 'container-xlarge' : '',
      marginBottom: '',
      paddingTop: !props.component.variant ? 'container-xlarge' : '',
    }}
    fluidContent
    isFlexibleHero={false}
  />
);
