import type { Message } from 'ai';
import { parse } from 'cookie';

import { AI_TOOL } from '../constants';
import { CartResult, RelatedProductsResult, UserRecommendationsFromCanvas } from '../types';

export const getUniformScoresFromCookie = (cookieValue: string): string | undefined => {
  const parsedCookie = parse(cookieValue);
  return parsedCookie['ufvd'];
};

const getToolInvocationResult = (message: Message, toolName: string) => {
  const result = message.parts?.find(
    part =>
      part.type === 'tool-invocation' &&
      'toolInvocation' in part &&
      part.toolInvocation.toolName == toolName &&
      'result' in part.toolInvocation &&
      Boolean(part.toolInvocation.result)
  );
  return JSON.parse(
    result && 'toolInvocation' in result && 'result' in result.toolInvocation ? result?.toolInvocation?.result : '{}'
  );
};

export const getCartResultFromMessage = (message: Message): CartResult => {
  const { products = [], total = 0 } = getToolInvocationResult(message, AI_TOOL.GET_CART);
  return { products, total };
};

export const getRelatedProductsFromMessage = (message: Message): RelatedProductsResult => {
  const { products = [] } = getToolInvocationResult(message, AI_TOOL.GET_RELATED_PRODUCTS);
  return { products };
};

export const getRecommendProductsFromMessage = (message: Message): Pick<UserRecommendationsFromCanvas, 'products'> => {
  const { products = [] } = getToolInvocationResult(message, AI_TOOL.GET_RECOMMEND_PRODUCTS);
  return { products };
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
