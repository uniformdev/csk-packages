import { Message } from 'ai';
import { ToolsName } from './constants';
import { ProductRecommendations } from './types';

export const getRecommendation = (message: Message): ProductRecommendations => {
  const result = message.parts?.find(
    part =>
      part.type === 'tool-invocation' &&
      'toolInvocation' in part &&
      part.toolInvocation.toolName == ToolsName.RECOMMEND_PRODUCTS &&
      'result' in part.toolInvocation &&
      Boolean(part.toolInvocation.result)
  );
  const { suggestedProducts = [], composition } = JSON.parse(
    result && 'toolInvocation' in result && 'result' in result.toolInvocation ? result?.toolInvocation?.result : '{}'
  );
  return { suggestedProducts, composition };
};

export const replacePromptVariables = (template: string, values: Record<string, string>, fallback = ''): string =>
  template.replace(/{{(.*?)}}/g, (_, key) => (key in values ? values[key] : fallback));
