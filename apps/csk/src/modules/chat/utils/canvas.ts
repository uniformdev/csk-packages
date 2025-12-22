import { cookies } from 'next/headers';
import {
  CanvasClient,
  CANVAS_PERSONALIZE_SLOT,
  CANVAS_PUBLISHED_STATE,
  flattenValues,
  mapSlotToPersonalizedVariations,
} from '@uniformdev/canvas';
import { getManifest } from '@uniformdev/canvas-next-rsc-v2';
import type { ManifestV2 } from '@uniformdev/context';
import { Context, CookieTransitionDataStore } from '@uniformdev/context';
import locales from '@/i18n/locales.json';
import { getProductRecommendations } from '@/utils/getProductRecommendations';
import resolveRouteFromRoutePath from '@/utils/resolveRouteFromRoutePath';
import {
  CART_COMPOSITION_PATH,
  CART_SLOT_NAME,
  CONTEXT_RECOMMENDATIONS_COMPOSITION_PATH,
  CONTEXT_RECOMMENDATIONS_DYNAMIC_VARIATION_NAME,
  CONTEXT_RECOMMENDATIONS_SLOT_NAME,
  PRODUCT_RECOMMENDATIONS_PATTERN_ID,
  RELATED_RECOMMENDATIONS_COMPOSITION_PATH,
  RELATED_RECOMMENDATIONS_DYNAMIC_VARIATION_NAME,
  RELATED_RECOMMENDATIONS_SLOT_NAME,
  USER_RECOMMENDATIONS_COMPOSITION_PATH,
  USER_RECOMMENDATIONS_SLOT_NAME,
} from '../constants';
import {
  BoostRecommendationsResult,
  CartFromCanvas,
  ContextRecommendationsFromCanvas,
  RelatedProductsFromCanvas,
  UserRecommendationsFromCanvas,
} from '../types';

const getLocalizedRoutePath = async (path: string) => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || locales.defaultLocale;
  return path?.replaceAll(':locale', locale);
};

export const getRecommendProductsFromCanvas = async ({
  scoreCookie,
}: {
  scoreCookie: string | undefined;
}): Promise<UserRecommendationsFromCanvas> => {
  const localizedRoutePath = await getLocalizedRoutePath(USER_RECOMMENDATIONS_COMPOSITION_PATH);
  const result = await resolveRouteFromRoutePath(localizedRoutePath);

  const composition = result.route?.compositionApiResponse?.composition;
  const code = result.code;

  if (!composition) {
    return { products: [], code: undefined };
  }

  const productSuggestions = composition.slots?.[USER_RECOMMENDATIONS_SLOT_NAME][0];
  if (!productSuggestions) {
    return { products: [], code: undefined };
  }

  const { trackingEventName, count } = flattenValues(productSuggestions) as {
    trackingEventName: string;
    count: string;
    algorithm: string;
  };

  const variants = productSuggestions?.slots?.[CANVAS_PERSONALIZE_SLOT];

  if (!trackingEventName || !count || !variants) {
    return { products: [], code: undefined };
  }

  const manifest = await getManifest({
    searchParams: new URLSearchParams(),
    cache: {
      type: 'revalidate',
      interval: 60,
    },
  });
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
    algorithm: 'ssc',
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
            _id: 'assistantScrollSection',
            slots: {
              [USER_RECOMMENDATIONS_SLOT_NAME]: variations,
            },
          },
        ],
      },
    },
    code,
  };
};

/**
 * Fetches the product recommendations component pattern from Uniform
 * and extracts the boostEnrichments and maxRecommendations parameters.
 */
const getRecommendationsPatternConfig = async (): Promise<{
  boostEnrichments: string[];
  maxRecommendations: number;
}> => {
  const canvasClient = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiHost: process.env.UNIFORM_CLI_BASE_URL!,
    edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL!,
  });

  try {
    const { composition } = await canvasClient.getCompositionById({
      compositionId: PRODUCT_RECOMMENDATIONS_PATTERN_ID,
      state: CANVAS_PUBLISHED_STATE,
    });

    const params = composition?.parameters || {};
    const boostEnrichments = (params.boostEnrichments?.value as string[]) || [];
    const maxRecommendationsValue = params.maxRecommendations?.value;
    const maxRecommendations = parseInt((maxRecommendationsValue as string) || '10', 10);

    return { boostEnrichments, maxRecommendations };
  } catch (error) {
    console.error('[getRecommendationsPatternConfig] Failed to fetch pattern:', error);
    // Fallback to defaults
    return {
      boostEnrichments: ['subCategory,subcategory', 'int,category', 'brand,brand'],
      maxRecommendations: 10,
    };
  }
};

/**
 * Alternative recommendation function that uses Typesense boost instead of personalization.
 * Fetches configuration from the component pattern and uses getProductRecommendations
 * with enrichment-based boosting for product ordering.
 * Returns full product data for rendering with the same UI component.
 */
export const getRecommendProductsWithBoost = async (): Promise<BoostRecommendationsResult> => {
  const { boostEnrichments, maxRecommendations } = await getRecommendationsPatternConfig();

  if (!boostEnrichments.length) {
    return { products: [], productTitles: [] };
  }

  const products = await getProductRecommendations({
    boostEnrichments,
    maxRecommendations,
    entryType: 'product',
  });

  const productTitles = products.map(product => ({
    title: product.title || product.name || '',
  }));

  return {
    products,
    productTitles,
  };
};

export const getCartFromCanvas = async (): Promise<CartFromCanvas> => {
  const localizedRoutePath = await getLocalizedRoutePath(CART_COMPOSITION_PATH);
  const result = await resolveRouteFromRoutePath(localizedRoutePath);

  const composition = result.route?.compositionApiResponse?.composition;
  const code = result.code;

  if (!composition) {
    return { composition: undefined, code: undefined };
  }

  return {
    composition: {
      ...composition,
      slots: {
        [CART_SLOT_NAME]: composition?.slots?.[CART_SLOT_NAME] || [],
      },
    },
    code,
  };
};

export const getRelatedProductsFromCanvas = async (slugs: string[]): Promise<RelatedProductsFromCanvas> => {
  if (slugs.length === 0) {
    return { composition: undefined, code: undefined };
  }

  const result = await resolveRouteFromRoutePath(
    getLocalizedRoutePath(RELATED_RECOMMENDATIONS_COMPOSITION_PATH) +
      `?${RELATED_RECOMMENDATIONS_DYNAMIC_VARIATION_NAME}=${slugs.join(', ')}`
  );

  const composition = result.route?.compositionApiResponse?.composition;
  const code = result.code;

  if (!composition) {
    return { composition: undefined, code: undefined };
  }

  return {
    composition: {
      ...composition,
      slots: {
        [RELATED_RECOMMENDATIONS_SLOT_NAME]: composition?.slots?.[RELATED_RECOMMENDATIONS_SLOT_NAME] || [],
      },
    },
    code,
  };
};

export const getContextRecommendationsFromCanvas = async (
  slugs: string[]
): Promise<ContextRecommendationsFromCanvas> => {
  if (slugs.length === 0) {
    return { composition: undefined, code: undefined };
  }

  const result = await resolveRouteFromRoutePath(
    getLocalizedRoutePath(CONTEXT_RECOMMENDATIONS_COMPOSITION_PATH) +
      `?${CONTEXT_RECOMMENDATIONS_DYNAMIC_VARIATION_NAME}=${slugs.join(', ')}`
  );

  const composition = result.route?.compositionApiResponse?.composition;
  const code = result.code;

  if (!composition) {
    return { composition: undefined, code: undefined };
  }

  return {
    composition: {
      ...composition,
      slots: {
        [CONTEXT_RECOMMENDATIONS_SLOT_NAME]: composition?.slots?.[CONTEXT_RECOMMENDATIONS_SLOT_NAME] || [],
      },
    },
    code,
  };
};
