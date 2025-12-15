import { cookies } from 'next/headers';
import { CANVAS_PERSONALIZE_SLOT, flattenValues, mapSlotToPersonalizedVariations } from '@uniformdev/canvas';
import { getManifest } from '@uniformdev/canvas-next-rsc-v2';
import type { ManifestV2 } from '@uniformdev/context';
import { Context, CookieTransitionDataStore } from '@uniformdev/context';
import locales from '@/i18n/locales.json';
import resolveRouteFromRoutePath from '@/utils/resolveRouteFromRoutePath';
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
