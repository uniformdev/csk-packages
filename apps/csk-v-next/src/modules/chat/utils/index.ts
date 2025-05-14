import type { Message } from 'ai';
import { parse } from 'cookie';
import { customAlphabet } from 'nanoid';
import { flattenValues, RichTextParamValue } from '@uniformdev/canvas';
import { Entry } from '@uniformdev/canvas';
import { EnrichmentData } from '@uniformdev/context';
import { renderToText } from '@uniformdev/richtext';
import { AI_ASSISTANT_CONFIGURATION_PLACEHOLDER, AI_TOOL } from '../constants';
import { CartResult, RelatedProductsResult, UserRecommendationsFromCanvas } from '../types';

export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789');

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

export const getContextRecommendationsFromMessage = (message: Message): { slugs: string[] } => {
  const { result = [] } = getToolInvocationResult(message, AI_TOOL.GET_CONTEXT) as {
    result?: { resource?: { slug?: string } }[];
  };
  return { slugs: result?.map(item => item?.resource?.slug || '').filter(Boolean) || [] };
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export const mergeEnrichments = (
  scores: Record<string, number> = {},
  interests: EnrichmentData[] = []
): EnrichmentData[] => {
  const interestStr = new Map(interests.map(i => [`${i.cat}_${i.key}`, i.str]));

  const updatedEnrichments = Object.entries(scores).reduce<EnrichmentData[]>((acc, [compoundKey, value]) => {
    const [cat, ...rest] = compoundKey.split('_');
    if (rest.length === 0) return acc;
    const key = rest.join('_');
    const str = interestStr.has(compoundKey) ? interestStr.get(compoundKey)! : value;
    acc.push({ cat, key, str });
    return acc;
  }, []);

  const seen = new Set(updatedEnrichments.map(e => `${e.cat}_${e.key}`));

  return [...updatedEnrichments, ...interests.filter(i => !seen.has(`${i.cat}_${i.key}`))];
};

export const transformEntryToResource = (entry: Entry) => {
  const id = entry.entry._id;
  const slug = entry.entry._slug || null;
  const type = entry.entry.type;

  const {
    title = '',
    shortDescription = '',
    content = null,
    body = null,
  } = flattenValues(entry.entry) as {
    title?: string;
    shortDescription?: string;
    content?: RichTextParamValue;
    body?: RichTextParamValue;
  };
  const textContent = renderToText(content?.root || body?.root);

  return { id, slug, type, title, shortDescription, textContent };
};

export const isAIAssistantConfigurationPage = (
  isPreviewMode: boolean,
  pathname: string,
  currentLocale?: string
): boolean => {
  if (isPreviewMode) {
    return false;
  }

  const base = AI_ASSISTANT_CONFIGURATION_PLACEHOLDER;
  const prefix = currentLocale ? base.replace(':locale', currentLocale) : base.replace('/:locale', '');

  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;

  return path.startsWith(prefix);
};
