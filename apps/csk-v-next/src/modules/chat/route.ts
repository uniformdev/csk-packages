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
import { RECOMMENDATIONS_COMPOSITION_SLUG, SUGGESTIONS_SLOT_NAME, ToolsName } from './constants';
import { getPromptsFromUniform } from './prompts';
import { ProductRecommendations } from './types';

const canvasClient = new CanvasClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
});

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
    const prompts = getPromptsFromUniform();

    return createDataStreamResponse({
      execute: dataStream => {
        const result = streamText({
          model: openai('gpt-4-turbo'),
          messages,
          system: prompts[ToolsName.SYSTEM],
          experimental_activeTools: [
            ToolsName.GET_USER_INTERESTS,
            ToolsName.SET_USER_INTERESTS,
            ToolsName.RECOMMEND_PRODUCTS,
          ],
          tools: {
            [ToolsName.GET_USER_INTERESTS]: tool({
              description: prompts[ToolsName.GET_USER_INTERESTS],
              parameters: z.object({}),
            }),
            [ToolsName.SET_USER_INTERESTS]: tool({
              description: prompts[ToolsName.SET_USER_INTERESTS],
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
            [ToolsName.RECOMMEND_PRODUCTS]: tool({
              description: prompts[ToolsName.RECOMMEND_PRODUCTS],
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
