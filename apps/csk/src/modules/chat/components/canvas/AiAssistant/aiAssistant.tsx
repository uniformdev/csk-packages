'use client';

import { FC, useEffect } from 'react';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import ChatButton from '@/modules/chat/components/ui/ChatButton';
import { useChatProvider } from '@/modules/chat/providers/ChatProvider';
import { AiAssistantProps, AiAssistantParameters } from '.';

const AiAssistant: FC<AiAssistantProps & AiAssistantParameters> = ({
  starterPrompts,
  modalTitle,
  modalSubtitle,
  inputPlaceholder,
}) => {
  const { isChatActive, setIsAiDrawerOpen, isAiDrawerOpen, setPrompts, setModalProps } = useChatProvider();

  useEffect(() => {
    setPrompts(starterPrompts?.filter(Boolean)?.map(prompt => prompt?.value) || []);
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

export default withFlattenParameters(AiAssistant);
