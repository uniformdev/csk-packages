'use client';

import { FC, useEffect, useState } from 'react';
import { UniformSlot, useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { EnrichmentData } from '@uniformdev/context';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useUniformInterests } from '@/hooks/useUniformInterests';
import { useChat } from '@ai-sdk/react';
import { ChatProps } from '.';
import { ChatButton } from './ui/ChatButton';
import { Drawers } from './ui/Drawers';
import { Messages } from './ui/Messages';
import { SubmitButton } from './ui/SubmitButton';
import { Textarea } from './ui/Textarea';

const MAX_STEPS = 5;
const AUTO_PROMPT = 'Quietly request my interests and greet me with some products I might be interested in.';

const Chat: FC<ChatProps> = ({ component, context, slots }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  const { context: localContext } = useUniformContext() || {};
  const { interests, count: interestCount } = useUniformInterests(localContext);

  const { messages, input, handleInputChange, handleSubmit, append, status } = useChat({
    maxSteps: MAX_STEPS,
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === 'getUserInterests') {
        console.info(`ToolCall: ${toolCall.toolName} Result: ${JSON.stringify(interests)}`, toolCall);
        return JSON.stringify(interests);
      } else if (toolCall.toolName === 'setUserInterests') {
        const { interests } = toolCall.args as { interests: EnrichmentData[] };

        console.info(`ToolCall: ${toolCall.toolName} Result: ${JSON.stringify(interests)}`, toolCall);
        await localContext?.forget(true);
        await localContext?.update({
          enrichments: interests,
        });

        return JSON.stringify({ success: true, updatedInterests: interests });
      }
    },
  });

  useEffect(() => {
    if (interestCount >= 10 && !messages.length) {
      append({
        content: AUTO_PROMPT,
        role: 'user',
      });
      setActive(true);
    }
  }, [interestCount, messages, append]);

  const filteredMessages = messages.filter(m => m.content !== AUTO_PROMPT && Boolean(m.content));

  return (
    <div>
      <ChatButton disabled={!active} onClick={() => setOpen(true)} />

      <Drawers open={open} setOpen={setOpen}>
        <div className="flex h-full flex-col px-4 py-6 sm:px-6">
          <h2 className="text-base font-semibold text-gray-900">Talk to your site</h2>
          <p className="text-sm leading-3 text-[#6b7280]">Powered by Uniform Context</p>
          <Messages
            status={status}
            messages={filteredMessages}
            recommendedProducts={<UniformSlot data={component} context={context} slot={slots.recommendations} />}
          />
          <div className="relative w-full flex-col gap-4">
            <Textarea
              placeholder="Send a message..."
              value={input}
              onChange={handleInputChange}
              className={cn('overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 pr-10')}
              autoFocus
              onKeyDown={event => {
                if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault();
                  if (['ready', 'error'].includes(status) && !!input.trim()) {
                    handleSubmit();
                  }
                }
              }}
            />
            <div className="absolute bottom-0 right-0 flex w-fit flex-row justify-end p-2">
              <SubmitButton disabled={!['ready', 'error'].includes(status) || !input.trim()} onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </Drawers>
    </div>
  );
};

export default Chat;
