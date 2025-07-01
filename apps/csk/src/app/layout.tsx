import { ReactNode } from 'react';
//? if (localization) {
import { NextIntlClientProvider } from 'next-intl';
//? }
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { UniformContext } from '@uniformdev/canvas-next-rsc';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/dimensions.css';
import '@/styles/fonts.css';
import '@/styles/borders.css';
import { customFontVariables } from '@/fonts';
import { Chat } from '@/modules/chat';
import { ChatProvider } from '@/modules/chat/providers/ChatProvider';
import { CardProvider } from '@/providers/CardProvider';
import { FavoritesProvider } from '@/providers/FavoritesProvider';
import { UniformClientContext } from '@/utils/clientContext';
//? if (ga) {
import { GoogleAnalytics } from '@next/third-parties/google';
//? }
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={customFontVariables}>
      <body>
        {/* //? if (localization) { */}
        <NextIntlClientProvider>
          {/* //? } */}
          <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <UniformContext clientContextComponent={UniformClientContext}>
              <CardProvider>
                <ChatProvider>
                  <FavoritesProvider>
                    <div className="flex">
                      <div className="flex-1">{children}</div>
                      <Chat />
                    </div>
                  </FavoritesProvider>
                </ChatProvider>
              </CardProvider>
            </UniformContext>
          </NextThemeProvider>
          {/* //? if (localization) { */}
        </NextIntlClientProvider>
        {/* //? } */}
      </body>
      {/* //? if (ga) { */}
      {process.env.GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />}
      {/* //? } */}
    </html>
  );
}
