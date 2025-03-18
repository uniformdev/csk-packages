//? if (aiAssistant) {
import { NextResponse } from 'next/server';
import { CoreMessage, createDataStreamResponse, streamText, tool } from 'ai';
import { parse } from 'cookie';
import { z } from 'zod';
import {
  CANVAS_PERSONALIZE_SLOT,
  CanvasClient,
  flattenValues,
  mapSlotToPersonalizedVariations,
} from '@uniformdev/canvas';
import { getManifest } from '@uniformdev/canvas-next-rsc';
import { Context, CookieTransitionDataStore, ManifestV2 } from '@uniformdev/context';
import locales from '@/i18n/locales.json';
import { openai } from '@ai-sdk/openai';
import {
  GET_USER_INTERESTS_DESCRIPTION,
  RECOMMEND_PRODUCTS_DESCRIPTION,
  SET_USER_INTERESTS_DESCRIPTION,
  SYSTEM_PROMPT,
} from './constants';
import { ProductRecommendations } from './types';

const canvasClient = new CanvasClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
});

const RECOMMENDATIONS_COMPOSITION_SLUG = 'product-recommendations';
const SUGGESTIONS_SLOT_NAME = 'recommendations';

const getRecommendationsComposition = async () => {
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: RECOMMENDATIONS_COMPOSITION_SLUG,
    locale: locales.defaultLocale,
  });
  return composition;
};

const getProductRecommendations = async ({
  scoreCookie,
}: {
  scoreCookie: string | undefined;
}): Promise<ProductRecommendations> => {
  const composition = await getRecommendationsComposition();

  const productSuggestions = composition.slots?.[SUGGESTIONS_SLOT_NAME][0];
  if (!productSuggestions) {
    return {
      suggestedProducts: [],
    };
  }

  const { trackingEventName, count } = flattenValues(productSuggestions) as {
    trackingEventName: string;
    count: string;
  };

  const variants = productSuggestions?.slots?.[CANVAS_PERSONALIZE_SLOT];

  if (!trackingEventName || !count || !variants) {
    return {
      suggestedProducts: [],
    };
  }

  const manifest = await getManifest({ searchParams: {} });

  const context = new Context({
    manifest: manifest as ManifestV2,
    defaultConsent: true,
    transitionStore: new CookieTransitionDataStore({
      serverCookieValue: scoreCookie,
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
    suggestedProducts,
    composition: {
      ...composition,
      slots: {
        ...composition.slots,
        [SUGGESTIONS_SLOT_NAME]: variations,
      },
    },
  };
};

export async function POST(req: Request) {
  try {
    const { messages }: { messages: CoreMessage[] } = await req.json();
    const cookieValue = req.headers.get('cookie') || '';
    const parsedCookie = parse(cookieValue);
    const scoreCookie = parsedCookie['ufvd'];

    return createDataStreamResponse({
      execute: dataStream => {
        const result = streamText({
          model: openai('gpt-4-turbo'),
          messages,
          system: SYSTEM_PROMPT,
          experimental_activeTools: ['getUserInterests', 'setUserInterests', 'recommendProducts'],
          tools: {
            getUserInterests: tool({
              description: GET_USER_INTERESTS_DESCRIPTION,
              parameters: z.object({}),
            }),
            setUserInterests: tool({
              description: SET_USER_INTERESTS_DESCRIPTION,
              parameters: z.object({
                interests: z.array(
                  z.object({
                    cat: z.string(),
                    key: z.string(),
                    str: z.number(),
                  })
                ),
              }),
            }),
            recommendProducts: tool({
              description: RECOMMEND_PRODUCTS_DESCRIPTION,
              parameters: z.object({}),
              async execute() {
                const recommendedProducts = await getProductRecommendations({
                  scoreCookie,
                });
                console.info('recommendProducts:', JSON.stringify(recommendedProducts.suggestedProducts, null, 2));
                return JSON.stringify(recommendedProducts);
              },
            }),
          },
        });
        result.consumeStream();
        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      },
      onError: e => {
        console.error(e);
        return 'Oops, an error occured!';
      },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
//? }
