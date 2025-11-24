import { ReactNode, Suspense } from 'react';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { UniformContext } from '@uniformdev/canvas-next-rsc-v2';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/dimensions.css';
import '@/styles/fonts.css';
import '@/styles/borders.css';
import { customFontVariables } from '@/fonts';
import locales from '@/i18n/locales.json';
import CoffeeShopProvider from '@/providers';
import { UniformClientContext } from '@/utils/clientContext';
import { getDir } from '@/utils/localization';
//? if (ga) {
import { GoogleAnalytics } from '@next/third-parties/google';
//? }

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || locales?.defaultLocale;
  return (
    <html lang={locale} dir={getDir(locale)} suppressHydrationWarning className={customFontVariables}>
      <body>
        <NextIntlClientProvider>
          <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <CoffeeShopProvider>{children}</CoffeeShopProvider>
          </NextThemeProvider>
          <Suspense>
            <UniformContext result={undefined} clientContextComponent={UniformClientContext} />
          </Suspense>
        </NextIntlClientProvider>
      </body>
      {/* //? if (ga) { */}
      {process.env.GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />}
      {/* //? } */}
    </html>
  );
}
