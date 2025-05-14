'use client';

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  type FC,
  type PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';

type ChatContextType = {
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: Dispatch<SetStateAction<boolean>>;
  isChatActive: boolean;
  setIsChatActive: Dispatch<SetStateAction<boolean>>;
  isPinned: boolean;
  setIsPinned: Dispatch<SetStateAction<boolean>>;
  prompts: string[];
  setPrompts: Dispatch<SetStateAction<string[]>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [prompts, setPrompts] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      isAiDrawerOpen,
      setIsAiDrawerOpen,
      isChatActive,
      setIsChatActive,
      isPinned,
      setIsPinned,
      prompts,
      setPrompts,
    }),
    [isAiDrawerOpen, isChatActive, isPinned, prompts]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatProvider = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
