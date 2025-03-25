import React, { FC } from 'react';
import { Message } from 'ai';
import { AiMessage } from './AiMessage';
import { UserMessage } from './UserMessage';
import { useScrollToBottom } from '../hooks/useScrollToBottom';

export type MessagesProps = {
  status: 'submitted' | 'streaming' | 'ready' | 'error';
  messages: Message[];
};

export const Messages: FC<MessagesProps> = ({ status, messages }) => {
  const [containerRef, endRef] = useScrollToBottom<HTMLDivElement>();

  const renderMessage = (message: Message, index: number) => {
    if (message.role === 'user') {
      if (index === 0) return null;
      return <UserMessage key={message.id} message={message} />;
    }
    return <AiMessage key={message.id} status={status} message={message} isLast={index === messages.length - 1} />;
  };

  return (
    <div ref={containerRef} className="thin-scrollbar my-6 flex flex-1 flex-col gap-2 overflow-y-auto pr-2">
      {messages.map((message, index) => (
        <div key={message.id}>{renderMessage(message, index)}</div>
      ))}
      <div ref={endRef} className="min-h-[24px] shrink-0" />
    </div>
  );
};

Messages.displayName = 'Messages';
