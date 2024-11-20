import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Asset } from '@uniformdev/assets';
import { flattenValues } from '@uniformdev/canvas';
import { PageParameters } from '@uniformdev/canvas-next-rsc';
import locales from '@/i18n/locales.json';
import { isRouteWithoutErrors, resolveAsset } from '@/utils/index';
import retrieveRoute from '@/utils/retrieveRoute';

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
  openGraphImage: Asset[];
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: Asset[];
  twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player';
  favicon: Asset[];
};

export async function generateMetadata(props: PageParameters): Promise<Metadata> {
  const route = await retrieveRoute(props, locales.defaultLocale);

  if (!isRouteWithoutErrors(route)) return notFound();

  const {
    compositionApiResponse: { composition },
  } = route;
  const parameters = flattenValues(composition, { levels: 0 }) as UniformMetadataParameters;

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
  } = parameters;

  const [resolvedOgImage] = resolveAsset(openGraphImage);
  const [resolvedTwitterImage] = resolveAsset(twitterImage);
  const [resolvedFavicon] = resolveAsset(favicon);

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
