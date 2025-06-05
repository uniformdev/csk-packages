import type { ResolvedRouteGetResponse, RootComponentInstance } from '@uniformdev/canvas';
import { CANVAS_PERSONALIZE_SLOT, flattenValues, mapSlotToPersonalizedVariations } from '@uniformdev/canvas';
import { getManifest } from '@uniformdev/canvas-next-rsc';
import type { ManifestV2 } from '@uniformdev/context';
import { Context, CookieTransitionDataStore } from '@uniformdev/context';
import locales from '@/i18n/locales.json';
import {
  CART_COMPOSITION_PATH,
  CART_SLOT_NAME,
  CONTEXT_RECOMMENDATIONS_COMPOSITION_PATH,
  CONTEXT_RECOMMENDATIONS_DYNAMIC_VARIATION_NAME,
  CONTEXT_RECOMMENDATIONS_SLOT_NAME,
  RELATED_RECOMMENDATIONS_COMPOSITION_PATH,
  RELATED_RECOMMENDATIONS_DYNAMIC_VARIATION_NAME,
  RELATED_RECOMMENDATIONS_SLOT_NAME,
  USER_RECOMMENDATIONS_COMPOSITION_PATH,
  USER_RECOMMENDATIONS_SLOT_NAME,
} from '../constants';
import {
  CartFromCanvas,
  ContextRecommendationsFromCanvas,
  RelatedProductsFromCanvas,
  UserRecommendationsFromCanvas,
} from '../types';
import { routeClient } from './uniformClients';

const getCompositionFromRoute = (route: ResolvedRouteGetResponse): RootComponentInstance | undefined =>
  'compositionApiResponse' in route && route?.compositionApiResponse && 'composition' in route.compositionApiResponse
    ? route.compositionApiResponse.composition
    : undefined;

export const getRecommendProductsFromCanvas = async ({
  scoreCookie,
}: {
  scoreCookie: string | undefined;
}): Promise<UserRecommendationsFromCanvas> => {
  const route = await routeClient.getRoute({
    path: USER_RECOMMENDATIONS_COMPOSITION_PATH,
    locale: locales.defaultLocale,
  });

  const composition = getCompositionFromRoute(route);

  if (!composition) {
    return { products: [] };
  }

  const productSuggestions = composition.slots?.[USER_RECOMMENDATIONS_SLOT_NAME][0];
  if (!productSuggestions) {
    return { products: [] };
  }

  const { trackingEventName, count } = flattenValues(productSuggestions) as {
    trackingEventName: string;
    count: string;
    algorithm: string;
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
        [USER_RECOMMENDATIONS_SLOT_NAME]: [
          {
            type: 'assistantScrollSection',
            slots: {
              [USER_RECOMMENDATIONS_SLOT_NAME]: variations,
            },
          },
        ],
      },
    },
  };
};

export const getCartFromCanvas = async (): Promise<CartFromCanvas> => {
  const route = await routeClient.getRoute({
    path: CART_COMPOSITION_PATH,
    locale: locales.defaultLocale,
  });

  const composition = getCompositionFromRoute(route);

  if (!composition) {
    return { composition: undefined };
  }

  return {
    composition: {
      ...composition,
      slots: {
        [CART_SLOT_NAME]: composition?.slots?.[CART_SLOT_NAME] || [],
      },
    },
  };
};

export const getRelatedProductsFromCanvas = async (slugs: string[]): Promise<RelatedProductsFromCanvas> => {
  if (slugs.length === 0) {
    return { composition: undefined };
  }

  const route = await routeClient.getRoute({
    path: `${RELATED_RECOMMENDATIONS_COMPOSITION_PATH}?${RELATED_RECOMMENDATIONS_DYNAMIC_VARIATION_NAME}=${slugs.join(', ')}`,
    locale: locales.defaultLocale,
  });

  const composition = getCompositionFromRoute(route);

  if (!composition) {
    return { composition: undefined };
  }

  return {
    composition: {
      ...composition,
      slots: {
        [RELATED_RECOMMENDATIONS_SLOT_NAME]: composition?.slots?.[RELATED_RECOMMENDATIONS_SLOT_NAME] || [],
      },
    },
  };
};

export const getContextRecommendationsFromCanvas = async (
  slugs: string[]
): Promise<ContextRecommendationsFromCanvas> => {
  if (slugs.length === 0) {
    return { composition: undefined };
  }

  const route = await routeClient.getRoute({
    path: `${CONTEXT_RECOMMENDATIONS_COMPOSITION_PATH}?${CONTEXT_RECOMMENDATIONS_DYNAMIC_VARIATION_NAME}=${slugs.join(', ')}`,
    locale: locales.defaultLocale,
  });

  const composition = getCompositionFromRoute(route);

  if (!composition) {
    return { composition: undefined };
  }

  return {
    composition: {
      ...composition,
      slots: {
        [CONTEXT_RECOMMENDATIONS_SLOT_NAME]: composition?.slots?.[CONTEXT_RECOMMENDATIONS_SLOT_NAME] || [],
      },
    },
  };
};
