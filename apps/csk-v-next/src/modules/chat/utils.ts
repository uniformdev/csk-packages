//? if (aiAssistant) {
import { Message } from 'ai';
import { ProductRecommendations } from './types';

export const getRecommendation = (message: Message): ProductRecommendations => {
  const result = message.parts?.find(
    part =>
      part.type === 'tool-invocation' &&
      'toolInvocation' in part &&
      part.toolInvocation.toolName == 'recommendProducts' &&
      'result' in part.toolInvocation &&
      Boolean(part.toolInvocation.result)
  );
  const { suggestedProducts = [], composition } = JSON.parse(
    result && 'toolInvocation' in result && 'result' in result.toolInvocation ? result?.toolInvocation?.result : '{}'
  );
  return { suggestedProducts, composition };
};
//? }
