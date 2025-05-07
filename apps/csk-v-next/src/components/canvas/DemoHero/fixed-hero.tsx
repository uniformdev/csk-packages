import { FC } from 'react';
import { DemoHeroProps } from '.';
import { DemoHero } from './demo-hero';

export const FixedHero: FC<DemoHeroProps> = props => (
  <DemoHero
    {...props}
    backgroundColor="bg-primary"
    // Eyebrow Text Parameters
    eyebrowTitleTag="span"
    eyebrowTitleColor={!props.component.variant ? 'text-primary' : 'text-tertiary'}
    eyebrowTitleSize={{
      mobile: 'xs',
      tablet: 'lg',
      desktop: 'xl',
    }}
    eyebrowTitleWeight="bold"
    eyebrowTitleTransform="uppercase"
    // Title Text Parameters
    titleColor={!props.component.variant ? 'text-primary' : 'text-tertiary'}
    titleSize={{
      mobile: '3xl',
      tablet: '4xl',
      desktop: '5xl',
    }}
    titleWeight="bold"
    // Description Text Parameters
    descriptionTag="p"
    descriptionColor={!props.component.variant ? 'text-primary' : 'text-tertiary'}
    descriptionSize={{
      mobile: 'sm',
      tablet: 'lg',
      desktop: 'xl',
    }}
    descriptionWeight="normal"
    // Primary Button Parameters
    primaryButtonSize="button-medium"
    primaryButtonTextSize="sm"
    primaryButtonTextColor={!props.component.variant ? 'text-secondary' : 'text-primary'}
    primaryButtonTextWeight="bold"
    primaryButtonButtonColor={!props.component.variant ? 'button-primary' : 'button-secondary'}
    primaryButtonTextTransform="uppercase"
    primaryButtonHoverButtonColor={!props.component.variant ? 'button-secondary' : 'button-tertiary'}
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
    isFlexibleHero={false}
  />
);
