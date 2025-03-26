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
import { UniformClientContext } from '@/utils/clientContext';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={customFontVariables}>
        <CardProvider>
          <NextIntlClientProvider>
            <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <UniformContext clientContextComponent={UniformClientContext}>
                {children}
                <Chat />
              </UniformContext>
            </NextThemeProvider>
          </NextIntlClientProvider>
        </CardProvider>
      </body>
      {process.env.GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />}
    </html>
  );
}
