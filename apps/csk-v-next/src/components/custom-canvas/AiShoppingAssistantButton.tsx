'use client';

import { useChatProvider } from '@/modules/chat/providers/ChatProvider';
import ChatButton from '@/modules/chat/ui/ChatButton';

const AiShoppingAssistantButton = () => {
  const { isChatActive, setIsAiDrawerOpen, isAiDrawerOpen } = useChatProvider();
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

export default AiShoppingAssistantButton;
