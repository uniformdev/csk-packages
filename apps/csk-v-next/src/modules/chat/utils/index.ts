import { Message } from 'ai';
import { parse } from 'cookie';
import { ToolsName } from '../constants';
import { CartResult, InterestRecommendations, RelatedProducts } from '../types';

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

export const getInterestRecommendationsFromMessage = (message: Message): Pick<InterestRecommendations, 'products'> => {
  const { products = [] } = getToolInvocationResult(message, ToolsName.RECOMMEND_PRODUCTS);
  return { products };
};

export const getRelatedRecommendationsFromMessage = (message: Message): RelatedProducts => {
  const { products = [] } = getToolInvocationResult(message, ToolsName.RELATED_PRODUCTS);
  return { products };
};

export const getCartResultFromMessage = (message: Message): CartResult => {
  const { products = [], total = 0 } = getToolInvocationResult(message, ToolsName.CART);
  return { products, total };
};

export const getUniformScoresFromCookie = (cookieValue: string): string | undefined => {
  const parsedCookie = parse(cookieValue);
  return parsedCookie['ufvd'];
};

export const replacePromptVariables = (template: string, values: Record<string, string>, fallback = ''): string =>
  template.replace(/{{(.*?)}}/g, (_, key) => (key in values ? values[key] : fallback));
