import {
  CANVAS_PERSONALIZE_SLOT,
  CanvasClient,
  flattenValues,
  mapSlotToPersonalizedVariations,
  RouteClient,
} from '@uniformdev/canvas';
import { getManifest } from '@uniformdev/canvas-next-rsc';
import { Context, CookieTransitionDataStore, ManifestV2 } from '@uniformdev/context';
import locales from '@/i18n/locales.json';
import {
  AI_ASSISTANT_CONFIGURATION_SLUG,
  CART_PATTERN_SLOT_NAME,
  CART_RECOMMENDATIONS_SLOT_NAME,
  INTEREST_RECOMMENDATIONS_SLOT_NAME,
} from '../constants';
import { CartPattern, InterestRecommendations, RelatedRecommendations } from '../types';

const canvasClient = new CanvasClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
  apiHost: process.env.UNIFORM_CLI_BASE_URL!,
  edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL!,
});

const routeClient = new RouteClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
  edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL!,
});

const getRecommendationsComposition = async () => {
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: AI_ASSISTANT_CONFIGURATION_SLUG,
    locale: locales.defaultLocale,
  });
  return composition;
};

export const getInterestRecommendations = async ({
  scoreCookie,
}: {
  scoreCookie: string | undefined;
}): Promise<InterestRecommendations> => {
  const composition = await getRecommendationsComposition();

  const productSuggestions = composition.slots?.[INTEREST_RECOMMENDATIONS_SLOT_NAME][0];
  if (!productSuggestions) {
    return { products: [] };
  }

  const { trackingEventName, count } = flattenValues(productSuggestions) as {
    trackingEventName: string;
    count: string;
  };

  const variants = productSuggestions?.slots?.[CANVAS_PERSONALIZE_SLOT];

  if (!trackingEventName || !count || !variants) {
    return { products: [] };
  }

  const manifest = await getManifest({ searchParams: {} });

  const context = new Context({
    manifest: manifest as ManifestV2,
    defaultConsent: true,
    transitionStore: new CookieTransitionDataStore({
      serverCookieValue: scoreCookie,
      experimental_quirksEnabled: true,
    }),
  });

  const { variations } = await context.personalize({
    name: trackingEventName,
    variations: mapSlotToPersonalizedVariations(variants),
    take: parseInt(count),
  });

  const suggestedProducts = variations
    .map(variation => {
      const values = flattenValues(variation);
      return {
        title: (values?.displayName || values?.title || values?.name || '') as string,
      };
    })
    .filter(({ title }) => title);

  return {
    products: suggestedProducts,
    composition: {
      ...composition,
      slots: {
        [INTEREST_RECOMMENDATIONS_SLOT_NAME]: variations,
      },
    },
  };
};

export const getCartPattern = async (): Promise<CartPattern> => {
  const composition = await getRecommendationsComposition();
  return {
    composition: {
      ...composition,
      slots: {
        [CART_PATTERN_SLOT_NAME]: composition?.slots?.[CART_PATTERN_SLOT_NAME] || [],
      },
    },
  };
};

export const getRelatedRecommendations = async (slugs: string[]): Promise<RelatedRecommendations> => {
  if (slugs.length === 0) {
    return { composition: undefined };
  }

  const route = await routeClient.getRoute({
    path: `/:locale/${AI_ASSISTANT_CONFIGURATION_SLUG}?product-slugs=${slugs.join(', ')}}`,
    locale: locales.defaultLocale,
  });

  const composition =
    'compositionApiResponse' in route && route?.compositionApiResponse && 'composition' in route?.compositionApiResponse
      ? route.compositionApiResponse.composition
      : undefined;

  if (!composition) {
    return { composition: undefined };
  }

  return {
    composition: {
      ...composition,
      slots: {
        [CART_RECOMMENDATIONS_SLOT_NAME]: composition.slots?.[CART_RECOMMENDATIONS_SLOT_NAME] || [],
      },
    },
  };
};
