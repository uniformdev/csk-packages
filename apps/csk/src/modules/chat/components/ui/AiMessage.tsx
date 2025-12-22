import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { UIMessage } from 'ai';
import { AiIcon } from './AiIcon';
import { Markdown } from './Markdown';
import {
  renderBoostRecommendations,
  renderCartComposition,
  renderContextRecommendationsComposition,
  renderRelatedRecommendationsComposition,
} from '../../server-actions/renderComposition';
import {
  getCartResultFromMessage,
  getContextRecommendationsFromMessage,
  getRecommendProductsFromMessage,
  getRelatedProductsFromMessage,
} from '../../utils';

type AiMessageProps = {
  status: 'submitted' | 'streaming' | 'ready' | 'error';
  message: UIMessage;
  isLast: boolean;
};

export function useAiMessageUiComponent(message: UIMessage): React.ReactNode | null {
  const [uiComponent, setUiComponent] = useState<React.ReactNode | null>(null);

  const { products: recommendationProducts } = useMemo(() => getRecommendProductsFromMessage(message), [message]);
  const { total: cartTotal } = useMemo(() => getCartResultFromMessage(message), [message]);
  const { products: relatedProducts } = useMemo(() => getRelatedProductsFromMessage(message), [message]);
  const { slugs: contextRecommendations } = useMemo(() => getContextRecommendationsFromMessage(message), [message]);

  useEffect(() => {
    const run = async () => {
      const component = await renderBoostRecommendations();
      setUiComponent(component);
    };

    if (recommendationProducts?.length > 0 && !uiComponent) {
      run();
    }
  }, [uiComponent, recommendationProducts?.length]);

  useEffect(() => {
    const run = async () => {
      const component = await renderCartComposition();
      setUiComponent(component);
    };

    if (cartTotal > 0 && !uiComponent) {
      run();
    }
  }, [cartTotal, uiComponent]);

  useEffect(() => {
    const run = async () => {
      const component = await renderRelatedRecommendationsComposition(relatedProducts.map(({ slug }) => slug));
      setUiComponent(component);
    };

    if (relatedProducts?.length > 0 && !uiComponent) {
      run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiComponent, relatedProducts?.length]);

  useEffect(() => {
    const run = async () => {
      const component = await renderContextRecommendationsComposition(contextRecommendations);
      setUiComponent(component);
    };

    if (contextRecommendations?.length > 0 && !uiComponent) {
      run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiComponent, contextRecommendations?.length]);

  return uiComponent;
}

const AiMessageComponent: FC<AiMessageProps> = ({ status, message }) => {
  const messageUiComponent = useAiMessageUiComponent(message);

  return (
    <div className="grid grid-cols-[32px_1fr] gap-2">
      <span className="flex items-start justify-center rounded-full">
        <AiIcon />
      </span>
      <div className="w-full overflow-hidden">
        <div>
          <p className="leading-relaxed">
            <span className="block text-lg font-bold text-gray-700">Shopping Assistant</span>
          </p>
          <div className="pl-1 text-base">
            <Markdown>{message.content}</Markdown>
          </div>
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
