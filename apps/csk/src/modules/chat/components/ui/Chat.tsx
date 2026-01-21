'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { IN_CONTEXT_EDITOR_QUERY_STRING_PARAM } from '@uniformdev/canvas';
import { useQuirks, useScores, useUniformContext } from '@uniformdev/next-app-router-client';
import { EnrichmentData } from '@uniformdev/context';
import { Flex } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { Drawers } from '@/modules/chat/components/ui/Drawers';
import { useCard } from '@/providers/CardProvider';
import { useChat } from '@ai-sdk/react';
import { Messages } from './Messages';
import PresetsSection from './PresetsSection';
import { SubmitButton } from './SubmitButton';
import { Textarea } from './Textarea';
import { AI_TOOL } from '../../constants';
import { useScrollToBottom } from '../../hooks/useScrollToBottom';
import { useChatProvider } from '../../providers/ChatProvider';
import { CartResult, RelatedProductsResult } from '../../types';
import { getRecommendProductsFromMessage, mergeEnrichments } from '../../utils';

const MAX_STEPS = 5;
const AUTO_PROMPT = 'Based on my interests, recommend me some products';

const Chat: FC = () => {
  const { isAiDrawerOpen, setIsAiDrawerOpen, setIsChatActive, isPinned, setIsPinned, prompts, modalProps } =
    useChatProvider();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { cartProducts, total } = useCard();
  const [startConversationIndex, setStartConversationIndex] = useState<number>(-1);
  const [containerRef, endRef, scrollToBottom, isAutoScrollEnabled] = useScrollToBottom<HTMLDivElement>();
  const scores = useScores();
  const quirks = useQuirks();
  const { context } = useUniformContext();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prevScoresRef = useRef(scores);

  const isPreviewMode = searchParams.get(IN_CONTEXT_EDITOR_QUERY_STRING_PARAM) === 'true';

  const { messages, input, handleInputChange, handleSubmit, append, status } = useChat({
    maxSteps: MAX_STEPS,
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === AI_TOOL.SET_USER_INTERESTS) {
        const { interests = [] } = toolCall.args as { interests: EnrichmentData[] };

        console.info(`AI-Tool-${toolCall.toolName} - interests: ${JSON.stringify(interests, null, 2)}`);
        const enrichments = mergeEnrichments(scores, interests);
        await context?.forget(true);
        await context?.update({ quirks, enrichments });

        return JSON.stringify({ success: true, updatedInterests: enrichments });
      } else if (toolCall.toolName === AI_TOOL.GET_CART) {
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
      } else if (toolCall.toolName === AI_TOOL.GET_RELATED_PRODUCTS) {
        const relatedProducts = cartProducts.map(({ recommendations }) => recommendations).flat();

        const result: RelatedProductsResult = {
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

  const showThinking = !['ready', 'error'].includes(status);
  const isReadyToSubmit = ['ready', 'error'].includes(status) && !!input.trim();

  useEffect(() => {
    if (isAiDrawerOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isAiDrawerOpen]);

  useEffect(() => {
    if (!isPinned && isAiDrawerOpen) setIsAiDrawerOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, setIsAiDrawerOpen]);

  useEffect(() => {
    if (isAiDrawerOpen && isAutoScrollEnabled && messages.length) {
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    }
  }, [isAiDrawerOpen, isAutoScrollEnabled, messages.length, scrollToBottom]);

  useEffect(() => {
    if (startConversationIndex !== -1) return;

    const indexWithRecommendation = messages.findIndex(message => {
      const { products } = getRecommendProductsFromMessage(message);
      return products.length > 0;
    });

    if (indexWithRecommendation !== -1) {
      setStartConversationIndex(indexWithRecommendation);
      setIsChatActive(true);
    } else {
      setIsChatActive(false);
    }
  }, [messages, setIsChatActive, startConversationIndex]);

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

  const sendPresetPrompt = (prompt: string) => {
    if (startConversationIndex === -1) {
      setStartConversationIndex(messages.length);
    }

    scrollToBottom();

    append({
      content: prompt,
      role: 'user',
    });
  };

  const handleSubmitWithScroll = () => {
    if (startConversationIndex === -1) {
      setStartConversationIndex(messages.length);
    }
    handleSubmit();
    scrollToBottom();
  };

  if (isPreviewMode) return null;

  return (
    <Drawers open={isAiDrawerOpen} setOpen={setIsAiDrawerOpen} pinned={isPinned} setPinned={setIsPinned}>
      <Flex direction="col" wrapperClassName="h-full [&>div]:h-full" className="h-full px-4 py-6 sm:px-6">
        <h2 className="pt-3 text-base font-semibold text-gray-900">{modalProps.modalTitle}</h2>
        <p className="text-sm italic leading-3 text-[#6b7280]">{modalProps.modalSubtitle}</p>

        <Messages
          status={status}
          messages={messages}
          startConversationIndex={startConversationIndex}
          endRef={endRef}
          containerRef={containerRef}
        />

        <div className="relative w-full flex-col gap-4">
          <div
            title={status}
            className={cn('min-h-2 transition-all duration-1000 my-2', {
              'animate-pulse bg-[#F7DF1E] rounded-full': showThinking,
            })}
          />
          <PresetsSection prompts={prompts} showThinking={showThinking} sendPresetPrompt={sendPresetPrompt} />
          <Textarea
            ref={textareaRef}
            placeholder={modalProps.inputPlaceholder}
            value={input}
            onChange={handleInputChange}
            className={cn('overflow-hidden resize-none rounded-none !text-base bg-muted pb-10 pr-10')}
            onKeyDown={event => {
              if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault();
                if (isReadyToSubmit) {
                  handleSubmitWithScroll();
                }
              }
            }}
          />
          <div className="absolute bottom-0 right-0 flex w-fit flex-row justify-end p-2">
            <SubmitButton disabled={!isReadyToSubmit} onClick={handleSubmitWithScroll} />
          </div>
        </div>
      </Flex>
    </Drawers>
  );
};

export default Chat;
