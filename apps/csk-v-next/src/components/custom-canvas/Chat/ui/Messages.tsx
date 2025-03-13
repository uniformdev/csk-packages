import { FC } from 'react';
import { Message } from 'ai';
import { useScrollToBottom } from '@/hooks/useScrollToBottom';
import { AiMessage } from './AiMessage';
import { Thinking } from './Thinking';
import { UserMessage } from './UserMessage';

type MessagesProps = {
  status: 'submitted' | 'streaming' | 'ready' | 'error';
  messages: Message[];
  recommendedProducts: React.ReactNode;
};

export const Messages: FC<MessagesProps> = ({ status, messages, recommendedProducts }) => {
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

  return (
    <div ref={messagesContainerRef} className="thin-scrollbar my-6 flex flex-1 flex-col gap-2 overflow-y-auto pr-2">
      {messages.map(m => (
        <div key={m.id}>
          {m.role !== 'user' ? (
            <AiMessage
              status={status}
              message={m}
              recommendedProducts={recommendedProducts}
              isLast={m.id === messages[messages.length - 1].id}
            />
          ) : (
            <UserMessage key={m.id} message={m} />
          )}
        </div>
      ))}

      {!['ready', 'error', 'streaming'].includes(status) && <Thinking />}

      <div ref={messagesEndRef} className="min-h-[24px] shrink-0" />
    </div>
  );
};
Messages.displayName = 'Messages';
