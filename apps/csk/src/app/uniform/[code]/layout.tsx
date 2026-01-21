import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/dimensions.css';
import '@/styles/fonts.css';
import '@/styles/borders.css';
import { customFontVariables } from '@/fonts';
import locales from '@/i18n/locales.json';
import CoffeeShopProvider from '@/providers';
import { getDir } from '@/utils/localization';
//? if (ga) {
import { GoogleAnalytics } from '@next/third-parties/google';
import { deserializeEvaluationResult } from '@uniformdev/next-app-router-shared';
//? }

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ code: string }>;
}>) {
  const { code } = await params;
  const pageState = deserializeEvaluationResult({
    input: code,
  });
  return (
    <html
      lang={pageState.locale!}
      dir={getDir(pageState.locale!)}
      suppressHydrationWarning
      className={customFontVariables}
    >
      <body>
        <NextIntlClientProvider>
          <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <CoffeeShopProvider>{children}</CoffeeShopProvider>
          </NextThemeProvider>
        </NextIntlClientProvider>
      </body>
      {/* //? if (ga) { */}
      {process.env.GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />}
      {/* //? } */}
    </html>
  );
}
