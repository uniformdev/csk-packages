import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createDataStreamResponse, streamText, tool } from 'ai';
import { z } from 'zod';
import locales from '@/i18n/locales.json';
import { openai } from '@ai-sdk/openai';

import { AI_TOOL, SYSTEM_PROMPT_NAME } from './constants';
import { findRelevantContent } from './rag/ai/embedding';
import { getRecommendProductsWithBoost } from './utils/canvas';
import { getPromptsFromUniform } from './utils/prompts';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value || locales.defaultLocale;
    const { messages } = await req.json();
    const prompts = getPromptsFromUniform();

    return createDataStreamResponse({
      execute: dataStream => {
        const result = streamText({
          model: openai('gpt-4-turbo'),
          messages,
          system: `${prompts[SYSTEM_PROMPT_NAME]}. Please respond in ${locale} language.`,
          experimental_activeTools: [
            AI_TOOL.SET_USER_INTERESTS,
            AI_TOOL.GET_RECOMMEND_PRODUCTS,
            AI_TOOL.GET_CART,
            AI_TOOL.GET_RELATED_PRODUCTS,
            AI_TOOL.GET_CONTEXT,
          ],
          tools: {
            [AI_TOOL.SET_USER_INTERESTS]: tool({
              description: prompts[AI_TOOL.SET_USER_INTERESTS],
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
            [AI_TOOL.GET_RECOMMEND_PRODUCTS]: tool({
              description: prompts[AI_TOOL.GET_RECOMMEND_PRODUCTS],
              parameters: z.object({}),
              execute: async () => {
                const { productTitles } = await getRecommendProductsWithBoost();
                console.info(
                  `AI-Tool-${[AI_TOOL.GET_RECOMMEND_PRODUCTS]} products:`,
                  JSON.stringify(productTitles, null, 2)
                );
                return JSON.stringify({ products: productTitles });
              },
            }),
            [AI_TOOL.GET_CART]: tool({
              description: prompts[AI_TOOL.GET_CART],
              parameters: z.object({}),
            }),
            [AI_TOOL.GET_RELATED_PRODUCTS]: tool({
              description: prompts[AI_TOOL.GET_RELATED_PRODUCTS],
              parameters: z.object({}),
            }),
            [AI_TOOL.GET_CONTEXT]: tool({
              description: prompts[AI_TOOL.GET_CONTEXT],
              parameters: z.object({
                query: z.string().describe('the users question'),
              }),
              execute: async ({ query }) => {
                console.info(`AI-Tool-${[AI_TOOL.GET_CONTEXT]} query:`, query);
                const result = await findRelevantContent(query);
                return JSON.stringify({ result });
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
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
