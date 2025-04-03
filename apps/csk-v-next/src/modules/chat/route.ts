import { NextResponse } from 'next/server';
import { CoreMessage, createDataStreamResponse, streamText, tool } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { ToolsName } from './constants';
import { getPromptsFromUniform } from './prompts';
import { getUniformScoresFromCookie } from './utils';
import { getInterestRecommendations } from './utils/canvas';

export async function POST(req: Request) {
  try {
    const { messages }: { messages: CoreMessage[] } = await req.json();
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
            ToolsName.CART,
            ToolsName.RELATED_PRODUCTS,
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
                const { products } = await getInterestRecommendations({
                  scoreCookie: getUniformScoresFromCookie(req.headers.get('cookie') || ''),
                });
                console.info(`${ToolsName.RECOMMEND_PRODUCTS}:`, JSON.stringify(products, null, 2));
                return JSON.stringify({ products });
              },
            }),
            [ToolsName.CART]: tool({
              description:
                'Call this when user asks to show his cart. Analize cart products and total price. Return user friendly short message about products in cart and total price. Also ask user if he wants to see some recommendations based on products in cart.',
              parameters: z.object({}),
            }),
            [ToolsName.RELATED_PRODUCTS]: tool({
              description:
                'Call this when user asks to see recommendations based on products in cart. Return user friendly short message describing these product in general.',
              parameters: z.object({}),
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
