import { ReactNode, Suspense } from 'react';
//? if (localization) {
import { NextIntlClientProvider } from 'next-intl';
//? }
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { UniformContext } from '@uniformdev/canvas-next-rsc-v2';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/dimensions.css';
import '@/styles/fonts.css';
import '@/styles/borders.css';
import { customFontVariables } from '@/fonts';
import { UniformClientContext } from '@/utils/clientContext';
//? if (ga) {
import { GoogleAnalytics } from '@next/third-parties/google';
//? }

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={customFontVariables}>
      <body>
        {/* //? if (localization) { */}
        <NextIntlClientProvider>
          {/* //? } */}
          <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </NextThemeProvider>
          <Suspense>
            <UniformContext result={undefined} clientContextComponent={UniformClientContext} />
          </Suspense>
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
