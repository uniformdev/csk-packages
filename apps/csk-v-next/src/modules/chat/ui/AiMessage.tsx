import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { Message } from 'ai';
import { AiIcon } from './AiIcon';
import {
  getCartResultFromMessage,
  getInterestRecommendationsFromMessage,
  getRelatedRecommendationsFromMessage,
  getUniformScoresFromCookie,
} from '../utils';
import { Markdown } from './Markdown';
import {
  getCartComposition,
  getInterestRecommendationsComposition,
  getRelatedRecommendationsComposition,
} from '../server-actions/renderComposition';

type AiMessageProps = {
  status: 'submitted' | 'streaming' | 'ready' | 'error';
  message: Message;
  isLast: boolean;
};

const AiMessageComponent: FC<AiMessageProps> = ({ status, message }) => {
  const [messageUiComponent, setMessageUiComponent] = useState<React.ReactNode | null>(null);

  const { products: interestRecommendationProducts } = useMemo(
    () => getInterestRecommendationsFromMessage(message),
    [message]
  );
  const { total: cartTotal } = useMemo(() => getCartResultFromMessage(message), [message]);
  const { products: relatedRecommendationProducts } = useMemo(
    () => getRelatedRecommendationsFromMessage(message),
    [message]
  );

  useEffect(() => {
    const run = async () => {
      const component = await getInterestRecommendationsComposition({
        scoreCookie: getUniformScoresFromCookie(document.cookie),
      });
      setMessageUiComponent(component);
    };

    if (interestRecommendationProducts?.length > 0 && !messageUiComponent) {
      run();
    }
  }, [messageUiComponent, interestRecommendationProducts?.length, status]);

  useEffect(() => {
    const run = async () => {
      const component = await getCartComposition();
      setMessageUiComponent(component);
    };

    if (cartTotal > 0 && !messageUiComponent) {
      run();
    }
  }, [cartTotal, messageUiComponent]);

  useEffect(() => {
    const run = async () => {
      const component = await getRelatedRecommendationsComposition(
        relatedRecommendationProducts.map(({ slug }) => slug)
      );
      setMessageUiComponent(component);
    };

    if (relatedRecommendationProducts.length > 0 && !messageUiComponent) {
      run();
    }
  }, [relatedRecommendationProducts.length, messageUiComponent]);

  if (!message.content && !setMessageUiComponent) return null;

  return (
    <div className="my-4 flex flex-1 gap-3 text-sm text-gray-600">
      <span className="flex items-start justify-center rounded-full">
        <AiIcon />
      </span>
      <div>
        <p className="leading-relaxed">
          <span className="block text-lg font-bold text-gray-700">AI</span>
        </p>
        <div className="text-base">
          <Markdown>{message.content}</Markdown>
        </div>

        {messageUiComponent && status === 'ready' && <div className="py-2">{messageUiComponent}</div>}
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
