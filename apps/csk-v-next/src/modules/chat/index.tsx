'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { IN_CONTEXT_EDITOR_QUERY_STRING_PARAM } from '@uniformdev/canvas';
import { useScores, useUniformContext } from '@uniformdev/canvas-next-rsc-client';
import { EnrichmentData } from '@uniformdev/context';
import { Flex } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { Drawers } from '@/components/custom-ui/Drawers';
import { useChat } from '@ai-sdk/react';
import { ToolsName } from './constants';
import { useChatProvider } from './providers/ChatProvider';
import { Messages } from './ui/Messages';
import { SubmitButton } from './ui/SubmitButton';
import { Textarea } from './ui/Textarea';
import { getInterestRecommendationsFromMessage } from './utils';
import { useCard } from '../cart';
import { CartResult, RelatedProducts } from './types';
import PresetsSection from './ui/PresetsSection';

const MAX_STEPS = 5;
const AUTO_PROMPT = "Based on my interests, recommend me some products. Don't call setUserInterests for now.";

const PROMPTS = [
  'Could you show me what’s in my shopping cart right now?',
  'Based on what I like, do you have any recommendations for me?',
  'Hey, could you take a look at my shopping cart and suggest a few products that might suit me?',
];

const Chat: FC = () => {
  const { isAiDrawerOpen, setIsAiDrawerOpen, setIsChatActive } = useChatProvider();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { cartProducts, total } = useCard();
  const [startConversationIndex, setStartConversationIndex] = useState<number>(-1);

  const scores = useScores();
  const { context } = useUniformContext();

  const isPreviewMode = searchParams.get(IN_CONTEXT_EDITOR_QUERY_STRING_PARAM) === 'true';

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prevScoresRef = useRef(scores);

  useEffect(() => {
    if (isAiDrawerOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isAiDrawerOpen]);

  useEffect(() => {
    setIsAiDrawerOpen(false);
  }, [pathname, setIsAiDrawerOpen]);

  const { messages, input, handleInputChange, handleSubmit, append, status } = useChat({
    maxSteps: MAX_STEPS,
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === ToolsName.GET_USER_INTERESTS) {
        console.info(`${toolCall.toolName}: ${JSON.stringify(scores, null, 2)}`);
        return JSON.stringify(scores);
      } else if (toolCall.toolName === ToolsName.SET_USER_INTERESTS) {
        const { interests } = toolCall.args as { interests: EnrichmentData[] };

        console.info(`${toolCall.toolName}: ${JSON.stringify(interests, null, 2)}`);
        await context?.forget(true);
        await context?.update({
          enrichments: interests,
        });

        return JSON.stringify({ success: true, updatedInterests: interests });
      } else if (toolCall.toolName === ToolsName.CART) {
        const result: CartResult = {
          products: cartProducts.map(({ slug, title, shortDescription }) => ({
            slug,
            title,
            shortDescription,
          })),
          total,
        };
        console.info(`${toolCall.toolName}: ${JSON.stringify(result, null, 2)}`);

        return JSON.stringify(result);
      } else if (toolCall.toolName === ToolsName.RELATED_PRODUCTS) {
        const relatedProducts = cartProducts.map(({ recommendations }) => recommendations).flat();

        const result: RelatedProducts = {
          products: relatedProducts.map(({ slug, title, shortDescription }) => ({
            slug,
            title,
            shortDescription,
          })),
        };
        console.info(`${toolCall.toolName}: ${JSON.stringify(result, null, 2)}`);

        return JSON.stringify(result);
      }
    },
  });

  useEffect(() => {
    const indexWithRecommendation = messages.findIndex(message => {
      const { products } = getInterestRecommendationsFromMessage(message);
      return products.length > 0;
    });

    if (indexWithRecommendation !== -1) {
      setStartConversationIndex(indexWithRecommendation);
      setIsChatActive(true);
    } else {
      setIsChatActive(false);
    }
  }, [messages, setIsChatActive]);

  useEffect(() => {
    if (startConversationIndex !== -1 || isPreviewMode) {
      return;
    }

    if (JSON.stringify(prevScoresRef.current) !== JSON.stringify(scores)) {
      prevScoresRef.current = scores;

      const hasNonZeroScore = scores && Object.values(scores).some(value => value !== 0);

      if (hasNonZeroScore) {
        append({
          content: AUTO_PROMPT,
          role: 'user',
        });
      }
    }
  }, [scores, startConversationIndex, append, isPreviewMode]);

  const showThinking = !['ready', 'error'].includes(status);

  const sendPresetPrompt = (prompt: string) => {
    if (startConversationIndex === -1) {
      setStartConversationIndex(messages.length);
    }

    append({
      content: prompt,
      role: 'user',
    });
  };

  if (isPreviewMode) return null;

  return (
    <div>
      <Drawers open={isAiDrawerOpen} setOpen={setIsAiDrawerOpen}>
        <Flex direction="col" wrapperClassName="h-full [&>div]:h-full" className="h-full px-4 py-6 sm:px-6">
          <h2 className="pt-3 text-base font-semibold text-gray-900">JavaDrip Shopping Assistant ✨</h2>
          <p className="text-sm italic leading-3 text-[#6b7280]">Powered by Uniform Context</p>

          <Messages status={status} messages={messages} startConversationIndex={startConversationIndex} />

          <div className="relative w-full flex-col gap-4">
            <div
              title={status}
              className={cn('min-h-2 transition-all duration-1000 my-2', {
                'animate-pulse bg-[#F7DF1E] rounded-full': showThinking,
              })}
            />
            <PresetsSection prompts={PROMPTS} showThinking={showThinking} sendPresetPrompt={sendPresetPrompt} />
            <Textarea
              ref={textareaRef}
              placeholder="Ask me anything about coffee beans or coffee makers 😎"
              value={input}
              onChange={handleInputChange}
              className={cn('overflow-hidden resize-none rounded-none !text-base bg-muted pb-10 pr-10')}
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
        </Flex>
      </Drawers>
    </div>
  );
};

export default Chat;
