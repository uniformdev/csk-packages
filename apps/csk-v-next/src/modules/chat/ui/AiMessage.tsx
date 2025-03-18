//? if (aiAssistant) {
import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { Message } from 'ai';
import Markdown from 'react-markdown';
import { AiIcon } from './AiIcon';
import { renderComposition } from '../server-actions/renderComposition';
import { getRecommendation } from '../utils';

type AiMessageProps = {
  status: 'submitted' | 'streaming' | 'ready' | 'error';
  message: Message;
  isLast: boolean;
};

const AiMessageComponent: FC<AiMessageProps> = ({ status, message }) => {
  const [recommendProductsComponent, setRecommendProductsComponent] = useState<React.ReactNode | null>(null);

  const { suggestedProducts, composition } = useMemo(() => getRecommendation(message), [message]);

  useEffect(() => {
    const run = async () => {
      const recommendProducts = await renderComposition(composition);
      setRecommendProductsComponent(recommendProducts);
    };

    if (suggestedProducts?.length > 0 && !recommendProductsComponent && status === 'ready') {
      run();
    }
  }, [composition, suggestedProducts?.length, recommendProductsComponent, status]);

  if (!message.content && !recommendProductsComponent) return null;

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
//? }
