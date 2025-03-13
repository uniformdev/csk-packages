import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { Message } from 'ai';
import Markdown from 'react-markdown';
import { productRecommendations } from '../actions';
import { AiIcon } from './icon/AiIcon';

type AiMessageProps = {
  status: 'submitted' | 'streaming' | 'ready' | 'error';
  message: Message;
  isLast: boolean;
};

const AiMessageComponent: FC<AiMessageProps> = ({ status, message }) => {
  const [recommendProductsComponent, setRecommendProductsComponent] = useState<React.ReactNode | null>(null);

  const resultRecommendProducts = useMemo(() => {
    const result = message.parts?.find(
      part =>
        part.type === 'tool-invocation' &&
        'toolInvocation' in part &&
        part.toolInvocation.toolName == 'recommendProducts' &&
        'result' in part.toolInvocation &&
        JSON.parse(part.toolInvocation.result || '{}')
    );
    const { suggestedProducts, composition } = JSON.parse(
      result && 'toolInvocation' in result && 'result' in result.toolInvocation ? result?.toolInvocation?.result : '{}'
    );
    return { suggestedProducts, composition };
  }, [message.parts]);

  useEffect(() => {
    const run = async () => {
      const recommendProducts = await productRecommendations(resultRecommendProducts?.composition);
      setRecommendProductsComponent(recommendProducts);
    };

    if (resultRecommendProducts?.suggestedProducts?.length > 0 && !recommendProductsComponent && status === 'ready') {
      run();
    }
  }, [
    recommendProductsComponent,
    resultRecommendProducts.composition,
    resultRecommendProducts.suggestedProducts.length,
    status,
  ]);

  return (
    <div className="my-4 flex flex-1 gap-3 text-sm text-gray-600">
      <span className="flex items-start justify-center rounded-full">
        <AiIcon />
      </span>
      <div>
        <p className="leading-relaxed">
          <span className="block font-bold text-gray-700">AI</span>
        </p>
        <Markdown>{message.content}</Markdown>

        {recommendProductsComponent && <div className="py-2">{recommendProductsComponent}</div>}
      </div>
    </div>
  );
};
AiMessageComponent.displayName = 'AiMessageComponent';

export const AiMessage = memo(AiMessageComponent, (prevProps, nextProps) => {
  if (prevProps.message.content !== nextProps.message.content) return false;
  if (prevProps.status !== 'ready' && nextProps.status === 'ready' && nextProps.isLast) return false;
  return true;
});
