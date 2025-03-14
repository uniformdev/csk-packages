import { ReactNode } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { UniformContext } from '@uniformdev/canvas-next-rsc';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/dimensions.css';
import '@/styles/fonts.css';
import '@/styles/borders.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-ibm-plex-sans">
        <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <UniformContext>{children}</UniformContext>
        </NextThemeProvider>
      </body>
    </html>
  );
}
