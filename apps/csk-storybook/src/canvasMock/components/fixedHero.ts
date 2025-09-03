import { AssetParamValue, AssetParamValueItem } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { DemoHeroContentAlignment, TextParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import { ResolvedAssetFromItem } from '@uniformdev/csk-components/types/cskTypes';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import { LIGHT_IMAGE_ASSET } from '@/assets';

export const getFixedHeroContent = (variant?: string) => ({
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
  } as LinkParamValue,

  image: resolveAsset(LIGHT_IMAGE_ASSET.value as AssetParamValue) as ResolvedAssetFromItem<AssetParamValueItem>[],

  contentAlignment: DemoHeroContentAlignment.Center,
  textColor: !variant ? 'text-secondary' : 'text-primary',
  overlayAutoTint: '0.4',
});
