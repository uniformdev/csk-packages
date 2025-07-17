'use client';

import { FC, useEffect } from 'react';
import { flattenValues } from '@uniformdev/canvas';
import ChatButton from '@/modules/chat/components/ui/ChatButton';
import { useChatProvider } from '@/modules/chat/providers/ChatProvider';
import { AiAssistantProps } from '.';

export const AiAssistant: FC<AiAssistantProps> = ({ starterPrompts, modalTitle, modalSubtitle, inputPlaceholder }) => {
  const { isChatActive, setIsAiDrawerOpen, isAiDrawerOpen, setPrompts, setModalProps } = useChatProvider();

  useEffect(() => {
    const prompts = flattenValues(starterPrompts) as unknown as { value: string }[];
    setPrompts(prompts.filter(Boolean)?.map(prompt => prompt?.value) || []);
  }, [setPrompts, starterPrompts]);

  useEffect(() => {
    setModalProps({ modalTitle, modalSubtitle, inputPlaceholder });
  }, [setModalProps, modalTitle, modalSubtitle, inputPlaceholder]);

  return (
    <ChatButton
      width={24}
      height={24}
      disabled={!isChatActive}
      onClick={() => setIsAiDrawerOpen(prev => !prev)}
      isAiDrawerOpen={isAiDrawerOpen}
    />
  );
};
