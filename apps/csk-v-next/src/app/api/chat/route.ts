import { NextResponse } from 'next/server';
import { convertToCoreMessages, createDataStreamResponse, streamText } from 'ai';
import { parse } from 'cookie';
import { z } from 'zod';
import { CANVAS_PERSONALIZE_SLOT, CanvasClient, mapSlotToPersonalizedVariations } from '@uniformdev/canvas';
import { getManifest } from '@uniformdev/canvas-next-rsc';
import { Context, CookieTransitionDataStore, ManifestV2 } from '@uniformdev/context';
import { openai } from '@ai-sdk/openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const SUGGESTIONS_SLOT_NAME = 'recommendations';

const canvasClient = new CanvasClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
});

const getRecommendationsComposition = async () => {
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: 'product-recommendations',
  });
  return composition;
};

type SuggestedProduct = {
  title: string;
};

const getProductRecommendations = async ({ scoreCookie }: { scoreCookie: string | undefined }) => {
  const composition = await getRecommendationsComposition();
  const suggestions = composition.slots?.[SUGGESTIONS_SLOT_NAME][0];
  const variants = suggestions?.slots?.[CANVAS_PERSONALIZE_SLOT] || [];
  const mapped = mapSlotToPersonalizedVariations(variants);

  const manifest = await getManifest({ searchParams: {} });

  const context = new Context({
    manifest: manifest as ManifestV2,
    defaultConsent: true,
    transitionStore: new CookieTransitionDataStore({
      serverCookieValue: scoreCookie,
    }),
  });

  const { variations } = await context.personalize({
    name: 'Recs',
    variations: mapped,
    take: 3,
  });

  const suggestedProducts: SuggestedProduct[] = variations.map(r => ({
    title: r.parameters!.title.value as string,
  }));

  return suggestedProducts;
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const cookieValue = req.headers.get('cookie') || '';
    const parsedCookie = parse(cookieValue);
    const scoreCookie = parsedCookie['ufvd'];

    return createDataStreamResponse({
      execute: dataStream => {
        const result = streamText({
          model: openai('gpt-4-turbo'),
          messages: convertToCoreMessages(messages),
          system:
            'The user is asking for product recommendations based on their interests. You are only allowed to recommend products based on interests of the user. If the user does not have any interests, do not recommend any products.',
          tools: {
            getInterests: {
              description: 'Call this to get the users interests',
              parameters: z.object({}),
            },
            setInterests: {
              description: 'Call this to set the users interests',
              parameters: z.object({
                interest: z.string(),
              }),
            },
            recommendProducts: {
              description:
                'Only call once. Call this without asking the user their interests. Recommended products with be returned in JSON. Use "title" field to display the product title.',
              parameters: z.object({}),
              async execute() {
                const recommendedProducts = await getProductRecommendations({
                  scoreCookie,
                });
                return JSON.stringify(recommendedProducts);
              },
            },
          },
        });
        result.consumeStream();
        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      },
      onError: () => {
        return 'Oops, an error occured!';
      },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
