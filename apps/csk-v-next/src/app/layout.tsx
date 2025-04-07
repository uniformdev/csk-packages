import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { UniformContext } from '@uniformdev/canvas-next-rsc';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/dimensions.css';
import '@/styles/fonts.css';
import '@/styles/borders.css';
import { customFontVariables } from '@/fonts';
import { CardProvider } from '@/modules/cart';
import Chat from '@/modules/chat';
import { ChatProvider } from '@/modules/chat/providers/ChatProvider';
import { FavoritesProvider } from '@/modules/favorites';
import { UniformClientContext } from '@/utils/clientContext';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={customFontVariables}>
        <UniformContext clientContextComponent={UniformClientContext}>
          <ChatProvider>
            <FavoritesProvider>
              <CardProvider>
                <NextIntlClientProvider>
                  <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
                    <div className="flex">
                      <div className="flex-1">{children}</div>
                      <Chat />
                    </div>
                  </NextThemeProvider>
                </NextIntlClientProvider>
              </CardProvider>
            </FavoritesProvider>
          </ChatProvider>
        </UniformContext>
      </body>
      {process.env.GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />}
    </html>
  );
}
