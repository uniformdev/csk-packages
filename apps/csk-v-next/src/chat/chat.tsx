'use client';

import { useEffect, useRef, useState } from 'react';
import { useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { useChat } from '@ai-sdk/react';

import { AiMessage } from './aiMessage';
import { ChatIcon } from './chatIcon';
import { useUniformInterests } from './hooks/useUniformInterests';
import { UserMessage } from './userMessage';
import enrichments from '../chat/enrichments.json';

const BRAND_ENRICHMENT_KEY = 'brand';
const DEVICE_ENRICHMENT_KEY = 'device';
const INTEREST_ENRICHMENT_KEY = 'interest';
const PLATFORM_ENRICHMENT_KEY = 'platform';

type EnrichmentKeys = readonly [
  typeof BRAND_ENRICHMENT_KEY,
  typeof DEVICE_ENRICHMENT_KEY,
  typeof INTEREST_ENRICHMENT_KEY,
  typeof PLATFORM_ENRICHMENT_KEY,
];

const converter: Record<EnrichmentKeys[number], (values: string[]) => string> = {
  [BRAND_ENRICHMENT_KEY]: values => `I like the brands ${values.join(', ')}.`,
  [DEVICE_ENRICHMENT_KEY]: values => `I like the devices ${values.join(', ')}.`,
  [INTEREST_ENRICHMENT_KEY]: values => `I am interested in ${values.join(', ')}.`,
  [PLATFORM_ENRICHMENT_KEY]: values => `I like the platforms ${values.join(', ')}.`,
};

const AUTO_PROMPT = 'Quietly request my interests and greet me with some products I might be interested in.';

export const Chat = () => {
  const { context } = useUniformContext() || {};
  const { interests, count: interestCount } = useUniformInterests(context);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [chatVisible, setChatVisible] = useState(false);
  const [active, setActive] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, append } = useChat({
    maxSteps: 5,
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === 'getInterests') {
        const responses: string[] = [];

        Object.keys(interests).forEach(key => {
          const values = interests[key as EnrichmentKeys[number]]!.map(i => i.id);
          const response = converter[key as EnrichmentKeys[number]](values.slice(0, 2));
          responses.push(response);
        });

        return responses.join(' ');
      } else if (toolCall.toolName === 'setInterests') {
        const { interest } = toolCall.args as { interest: string };

        let cat: string | undefined;
        let key: string | undefined;

        for (let i = 0; i < enrichments.length; i++) {
          const enrichment = enrichments[i]!;
          const val = enrichment.values.find(
            v => v.id.toLowerCase() === interest.toLowerCase() || v.value.toLowerCase() === interest.toLowerCase()
          );

          if (val) {
            cat = enrichment.id;
            key = val.id;
            break;
          }
        }

        if (!cat || !key) {
          return;
        }

        await context?.update({
          enrichments: [
            {
              cat,
              key,
              str: 100,
            },
          ],
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
      <span>
        <button
          className="rounded-full bg-none py-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-primary"
          type="button"
          aria-haspopup="dialog"
          onClick={e => {
            e.preventDefault();
            if (active) {
              setChatVisible(prev => !prev);
            }
          }}
        >
          <ChatIcon active={active} />
        </button>
      </span>

      <div
        style={{ zIndex: 999, boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
        className={`fixed right-0 top-[calc(4rem+1.5rem)] mr-4 h-[634px] w-[440px] rounded-lg border bg-white p-6 ${!chatVisible ? 'hidden' : ''}`}
      >
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="text-lg font-bold tracking-tight text-[#00549a] hover:bg-blue-500">Talk to your site</h2>
          <p className="text-sm leading-3 text-[#6b7280]">Powered by Uniform Context</p>
        </div>
        {/* Chat Container */}
        <div className="h-[474px] pr-4" style={{ minWidth: '100%', overflowY: 'auto' }} ref={messagesRef}>
          {filteredMessages.map(m => (
            <div key={m.id}>
              {m.role !== 'user' && <AiMessage message={m} />}
              {m.role === 'user' && <UserMessage message={m} />}
            </div>
          ))}
        </div>
        {/* Input box  */}
        {filteredMessages.length > 0 ? (
          <div className="flex items-center pt-0">
            <form className="flex w-full items-center justify-center space-x-2" onSubmit={handleSubmit}>
              <input
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#030712] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Type your message"
                value={input}
                onChange={handleInputChange}
              />
              <button className="inline-flex h-10 items-center justify-center rounded-md bg-[#00549a] px-4 py-2 text-sm font-medium text-[#f9fafb] hover:bg-blue-500 disabled:pointer-events-none disabled:opacity-50">
                Send
              </button>
            </form>
          </div>
        ) : (
          <h2 className="text-sm tracking-tight text-[#00549a] hover:bg-blue-500">Loading...</h2>
        )}
      </div>
    </div>
  );
};
