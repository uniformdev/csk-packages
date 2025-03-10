import Markdown from 'react-markdown';
import { Message } from '@ai-sdk/react';
import { UserIcon } from './icon/UserIcon';

export const UserMessage = ({ message }: { message: Message }) => (
  <div className="my-4 flex flex-1 gap-3 text-sm text-gray-600">
    <span className="relative flex size-8 shrink-0 overflow-hidden rounded-full">
      <UserIcon />
    </span>
    <div>
      <p className="italic leading-relaxed">
        <span className="block font-bold italic text-gray-700">You</span>
      </p>
      <Markdown>{message.content}</Markdown>
    </div>
  </div>
);
UserMessage.displayName = 'UserMessage';
