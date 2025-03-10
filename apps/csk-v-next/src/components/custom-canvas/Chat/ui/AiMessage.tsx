import React, { FC, memo, useEffect, useState } from 'react';
import { Message } from 'ai';
import Markdown from 'react-markdown';
import { AiIcon } from './icon/AiIcon';

type AiMessageProps = {
  status: 'submitted' | 'streaming' | 'ready' | 'error';
  message: Message;
  recommendedProducts: React.ReactNode;
  isLast: boolean;
};

const AiMessageComponent: FC<AiMessageProps> = ({ status, message, recommendedProducts }) => {
  const [clonedHtml, setClonedHtml] = useState('');

  useEffect(() => {
    try {
      if (status === 'ready') {
        const recommendProducts = message.parts?.find(
          part =>
            part.type === 'tool-invocation' &&
            'toolInvocation' in part &&
            part.toolInvocation.toolName == 'recommendProducts' &&
            'result' in part.toolInvocation &&
            JSON.parse(part.toolInvocation.result || '[]').length > 0
        );

        const element = document.getElementById(message.id);
        if (recommendProducts && element) {
          setClonedHtml(element.outerHTML);
        }
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }, [message.parts, status, message.id]);

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

        {!clonedHtml ? (
          <div id={message.id} className="hidden">
            {recommendedProducts}
          </div>
        ) : (
          <div>
            <div className="py-2 *:!block" dangerouslySetInnerHTML={{ __html: clonedHtml }} />
          </div>
        )}
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
