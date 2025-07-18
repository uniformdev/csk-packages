import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AssetParamValue, AssetParamValueItem } from '@uniformdev/assets';
import { flattenValues } from '@uniformdev/canvas';
import { resolveRouteFromCode, UniformPageParameters } from '@uniformdev/canvas-next-rsc-v2';
import { ResolvedAssetFromItem } from '@uniformdev/csk-components/types/cskTypes';

type UniformMetadataParameters = {
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphType:
    | 'website'
    | 'article'
    | 'book'
    | 'profile'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other';
  openGraphImage: AssetParamValue;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: AssetParamValue;
  twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player';
  favicon: AssetParamValue;
};

/**
 * Resolves a list of assets, filtering out any entries without a valid URL.
 *
 * @param {AssetParamValue | undefined} image - The list of assets to resolve.
 * @returns {ResolvedAsset[]} - An array of resolved assets with valid URLs.
 */
export const resolveAsset = (image?: AssetParamValue): ResolvedAssetFromItem<AssetParamValueItem>[] =>
  (flattenValues(image as never) || []).filter(({ url }) => Boolean(url));

/**
 * Generates metadata for a page using Uniform parameters and assets.
 *
 * @param {PageParameters} props - The parameters for the page, including routing and locale data.
 * @returns {Promise<Metadata>} - The metadata object compatible with Next.js.
 * @throws Will throw an error if the route contains issues or cannot be found.
 */
export async function generateMetadata(props: UniformPageParameters): Promise<Metadata> {
  const result = await resolveRouteFromCode(props);

  if (!result.route) {
    notFound();
  }

  const { route } = result;

  const {
    compositionApiResponse: { composition },
  } = route;

  // Flatten the composition parameters for easier access
  const parameters = flattenValues(composition, { levels: 0 }) as UniformMetadataParameters;

  // Destructure metadata parameters from the composition
  const {
    pageTitle,
    pageDescription,
    pageKeywords,
    openGraphTitle,
    openGraphDescription,
    openGraphImage,
    openGraphType,
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterCard,
    favicon,
  } = parameters || {};

  // Resolve assets for Open Graph, Twitter, and favicon
  const [resolvedOgImage] = resolveAsset(openGraphImage);
  const [resolvedTwitterImage] = resolveAsset(twitterImage);
  const [resolvedFavicon] = resolveAsset(favicon);

  // Construct and return the metadata object
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    icons: {
      icon: resolvedFavicon?.url,
    },
    openGraph: {
      title: openGraphTitle || pageTitle,
      description: openGraphDescription || pageDescription,
      type: openGraphType || 'website',
      images: resolvedOgImage?.url,
    },
    twitter: {
      title: twitterTitle || pageTitle,
      description: twitterDescription || pageDescription,
      images: resolvedTwitterImage?.url || resolvedOgImage?.url,
      card: twitterCard,
    },
  };
}
