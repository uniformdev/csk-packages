import { AssetParamValue } from '@uniformdev/assets';
import {
  DemoHeroContentAlignment,
  TextParameters,
  DemoHeroParameters as FixedHeroParameters,
} from '@uniformdev/csk-components/components/canvas';
import { LIGHT_IMAGE_ASSET } from '@/assets';

export const getFixedHeroContent = (variant?: string): FixedHeroParameters => ({
  displayName: 'Fixed Hero',

  eyebrowTitleText: 'SOMETHING FOR THE DEVELOPERS',

  titleText: 'Built with the modern stack!',
  titleTag: 'h2' as TextParameters['tag'],

  descriptionText:
    'Our Component Starter Kit is built on a TNT stack - Typescript, Next.js, and TailwindCSS. That means it’s completely customizable and adaptable for what you need to build.',

  primaryButtonText: 'Primary',
  primaryButtonLink: {
    type: 'url',
    path: '/',
  },

  image: LIGHT_IMAGE_ASSET.value as AssetParamValue,

  contentAlignment: DemoHeroContentAlignment.Center,
  fullHeight: false,
  eyebrowTitleColor: !variant ? 'text-secondary' : 'text-tertiary',
  titleColor: !variant ? 'text-secondary' : 'text-primary',
  descriptionColor: !variant ? 'text-secondary' : 'text-primary',
});
