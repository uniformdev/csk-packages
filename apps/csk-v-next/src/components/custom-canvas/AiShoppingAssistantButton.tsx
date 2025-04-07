'use client';

import { useChatProvider } from '@/modules/chat/providers/ChatProvider';
import ChatButton from '@/modules/chat/ui/ChatButton';

const AiShoppingAssistantButton = () => {
  const { isChatActive, setIsAiDrawerOpen } = useChatProvider();
  return <ChatButton width={24} height={24} disabled={!isChatActive} onClick={() => setIsAiDrawerOpen(true)} />;
};

export default AiShoppingAssistantButton;
