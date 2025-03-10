'use client';

import { FC, useEffect, useState } from 'react';
import { UniformSlot, useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { AUTO_PROMPT, MAX_STEPS } from '@/chat/constants';
import enrichments from '@/chat/enrichments.json';
import { useUniformInterests } from '@/hooks/useUniformInterests';
import { useChat } from '@ai-sdk/react';
import { ChatProps } from '.';
import { converter, EnrichmentKeys } from './enrichment';
import { ChatButton } from './ui/ChatButton';
import { Drawers } from './ui/Drawers';
import { Messages } from './ui/Messages';
import { SubmitButton } from './ui/SubmitButton';
import { Textarea } from './ui/Textarea';

const Chat: FC<ChatProps> = ({ component, context, slots }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);

  const { context: localContext } = useUniformContext() || {};
  const { interests, count: interestCount } = useUniformInterests(localContext);

  const { messages, input, handleInputChange, handleSubmit, append, status } = useChat({
    maxSteps: MAX_STEPS,
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === 'getInterests') {
        return Object.entries(interests)
          .map(([key, items]) => {
            const values = items!.map(i => i.id).slice(0, 2);
            return converter[key as EnrichmentKeys[number]](values);
          })
          .join(' ');
      } else if (toolCall.toolName === 'setInterests') {
        const { interest } = toolCall.args as { interest: string };

        const found = enrichments
          .flatMap(enrichment =>
            enrichment.values
              .filter(
                v => v.id.toLowerCase() === interest.toLowerCase() || v.value.toLowerCase() === interest.toLowerCase()
              )
              .map(v => ({ cat: enrichment.id, key: v.id }))
          )
          .shift();

        if (!found) return "Oops! I couldn't find that interest. Please try again.";

        await localContext?.update({
          enrichments: [{ ...found, str: 100 }],
        });

        return 'Thank you for sharing your interests!';
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
