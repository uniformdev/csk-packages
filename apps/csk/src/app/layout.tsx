import { ReactNode, Suspense } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { UniformContext } from '@uniformdev/canvas-next-rsc-v2';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/dimensions.css';
import '@/styles/fonts.css';
import '@/styles/borders.css';
import { customFontVariables } from '@/fonts';
import CoffeeShopProvider from '@/providers';
import { UniformClientContext } from '@/utils/clientContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={customFontVariables}>
      <body>
        <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CoffeeShopProvider>{children}</CoffeeShopProvider>
        </NextThemeProvider>
        <Suspense>
          <UniformContext clientContextComponent={UniformClientContext} />
        </Suspense>
      </body>
    </html>
  );
}
