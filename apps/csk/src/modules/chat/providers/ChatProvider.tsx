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

type ModalProps = {
  modalTitle?: string;
  modalSubtitle?: string;
  inputPlaceholder?: string;
};

type ChatContextType = {
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: Dispatch<SetStateAction<boolean>>;
  isChatActive: boolean;
  setIsChatActive: Dispatch<SetStateAction<boolean>>;
  isPinned: boolean;
  setIsPinned: Dispatch<SetStateAction<boolean>>;
  prompts: string[];
  setPrompts: Dispatch<SetStateAction<string[]>>;
  modalProps: ModalProps;
  setModalProps: Dispatch<SetStateAction<ModalProps>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [modalProps, setModalProps] = useState<ModalProps>({
    modalTitle: 'JavaDrip Shopping Assistant ✨',
    modalSubtitle: 'Powered by Uniform Context',
    inputPlaceholder: 'Ask me anything about coffee beans or coffee makers 😎',
  });

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
      modalProps,
      setModalProps,
    }),
    [isAiDrawerOpen, isChatActive, isPinned, prompts, modalProps]
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
