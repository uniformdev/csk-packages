import { ReactNode } from 'react';
//? if (localization) {
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
//? }
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { UniformContext } from '@uniformdev/canvas-next-rsc';
import { customFontVariables } from '@/fonts';
import { CardProvider } from '@/providers/CardProvider';
import { FavoritesProvider } from '@/providers/FavoritesProvider';
import { UniformClientContext } from '@/utils/clientContext';
//? if (ga) {
import { GoogleAnalytics } from '@next/third-parties/google';
//? }
export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en-us';

  return (
    <html lang={locale} suppressHydrationWarning className={customFontVariables}>
      <body className={customFontVariables}>
        {/* //? if (localization) { */}
        <NextIntlClientProvider>
          {/* //? } */}
          <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <UniformContext clientContextComponent={UniformClientContext}>
              <CardProvider>
                <FavoritesProvider>{children}</FavoritesProvider>
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
