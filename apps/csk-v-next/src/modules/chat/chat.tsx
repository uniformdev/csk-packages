'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { EnrichmentData } from '@uniformdev/context';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { Drawers } from '@/components/custom-ui/Drawers';
import { useChat } from '@ai-sdk/react';
import { ChatProps } from '.';
import ChatButton from './ui/ChatButton';
import { Messages } from './ui/Messages';
import { SubmitButton } from './ui/SubmitButton';
import { Textarea } from './ui/Textarea';
import { getRecommendation } from './utils';

const MAX_STEPS = 5;
const AUTO_PROMPT = "Based on my interests, recommend me some products. Don't call setUserInterests for now.";

const Chat: FC<ChatProps> = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { context } = useUniformContext() || {};
  const { scores } = context || {};

  useEffect(() => {
    if (open && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [open]);

  const { messages, input, handleInputChange, handleSubmit, append, status } = useChat({
    maxSteps: MAX_STEPS,
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === 'getUserInterests') {
        console.info(`${toolCall.toolName}: ${JSON.stringify(scores, null, 2)}`);
        return JSON.stringify(scores);
      } else if (toolCall.toolName === 'setUserInterests') {
        const { interests } = toolCall.args as { interests: EnrichmentData[] };

        console.info(`${toolCall.toolName}: ${JSON.stringify(interests, null, 2)}`);
        await context?.forget(true);
        await context?.update({
          enrichments: interests,
        });

        return JSON.stringify({ success: true, updatedInterests: interests });
      }
    },
  });

  useEffect(() => {
    if (!messages.length && !!Object.keys(scores || {}).length) {
      append({
        content: AUTO_PROMPT,
        role: 'user',
      });
    }
  }, [append, messages.length, scores]);

  useEffect(() => {
    if (active || messages.length > 2) return;

    const isRecommendation = messages.some(m => {
      const { suggestedProducts } = getRecommendation(m);
      return suggestedProducts.length > 0;
    });

    if (isRecommendation) {
      setActive(true);
    }
  }, [active, messages]);

  const showThinking = !['ready', 'error'].includes(status);

  return (
    <div>
      <div className="fixed bottom-0 right-0 p-16">
        <ChatButton disabled={!active} onClick={() => setOpen(true)} />
      </div>

      <Drawers open={open} setOpen={setOpen}>
        <div className="flex h-full flex-col px-4 py-6 sm:px-6">
          <h2 className="text-base font-semibold text-gray-900">Talk to your site</h2>
          <p className="text-sm leading-3 text-[#6b7280]">Powered by Uniform Context</p>
          <Messages status={status} messages={messages} />
          <div className="relative w-full flex-col gap-4">
            <div
              title={status}
              className={cn('min-h-2 transition-all duration-1000 my-2', {
                'animate-pulse bg-[#F7DF1E] rounded-full': showThinking,
              })}
            />
            <Textarea
              ref={textareaRef}
              placeholder="Send a message..."
              value={input}
              onChange={handleInputChange}
              className={cn('overflow-hidden resize-none rounded-2xl !text-base bg-muted pb-10 pr-10')}
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
