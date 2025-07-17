import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { UniformContext } from '@uniformdev/canvas-next-rsc';
import { customFontVariables } from '@/fonts';
import { Chat } from '@/modules/chat';
import { ChatProvider } from '@/modules/chat/providers/ChatProvider';
import { CardProvider } from '@/providers/CardProvider';
import { FavoritesProvider } from '@/providers/FavoritesProvider';
import { getDir } from '@/utils/ localization';
import { UniformClientContext } from '@/utils/clientContext';
//? if (ga) {
import { GoogleAnalytics } from '@next/third-parties/google';
//? }
export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en-us';

  return (
    <html lang={locale} dir={getDir(locale)} suppressHydrationWarning className={customFontVariables}>
      <body className={customFontVariables}>
        <NextIntlClientProvider>
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
        </NextIntlClientProvider>
      </body>
      {/* //? if (ga) { */}
      {process.env.GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />}
      {/* //? } */}
    </html>
  );
}
