import { memo } from 'react';
import Markdown from 'react-markdown';
import { Message } from '@ai-sdk/react';

const UserMessageComponent = ({ message }: { message: Message }) => (
  <div className="my-4 flex flex-1 gap-3 text-sm text-gray-600">
    <span className="relative flex size-8 shrink-0 overflow-hidden rounded-full">
      <div className="relative size-8 rounded-full border-none bg-gray-100">
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          stroke="none"
          fill="black"
          strokeWidth={0}
          viewBox="0 0 16 16"
          height={24}
          width={24}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
        </svg>
      </div>
    </span>
    <div>
      <p className="italic leading-relaxed">
        <span className="block font-bold italic text-gray-700">You</span>
      </p>
      <Markdown>{message.content}</Markdown>
    </div>
  </div>
);
UserMessageComponent.displayName = 'UserMessage';

export const UserMessage = memo(UserMessageComponent);
