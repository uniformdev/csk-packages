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
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);

  const value = useMemo(
    () => ({ isAiDrawerOpen, setIsAiDrawerOpen, isChatActive, setIsChatActive }),
    [isAiDrawerOpen, isChatActive]
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
