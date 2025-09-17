'use client';

import { Suspense } from 'react';
import Chat from '@/modules/chat/components/ui/Chat';
import { ChatProvider } from '@/modules/chat/providers/ChatProvider';
import { CardProvider } from './CardProvider';
import { FavoritesProvider } from './FavoritesProvider';

const CoffeeShopProvider = ({ children }: { children: React.ReactNode }) => (
  <CardProvider>
    <FavoritesProvider>
      <ChatProvider>
        <div className="flex">
          <div className="flex-1">{children}</div>
          <Suspense>
            <Chat />
          </Suspense>
        </div>
      </ChatProvider>
    </FavoritesProvider>
  </CardProvider>
);

export default CoffeeShopProvider;
