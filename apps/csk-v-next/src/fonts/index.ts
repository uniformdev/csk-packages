import { DM_Sans, Space_Mono } from 'next/font/google';

export const dm_sans = DM_Sans({
  subsets: ['latin'],
  variable: '--primary',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['italic', 'normal'],
  preload: true,
});

export const space_mono = Space_Mono({
  subsets: ['latin'],
  variable: '--secondary',
  display: 'swap',
  weight: ['400', '700'],
  style: ['italic', 'normal'],
  preload: true,
});

import localFont from 'next/font/local';

export const dinNextRounded = localFont({
  src: [
    {
      path: './custom/DINNextRoundedLTW01-Lig.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './custom/DINNextRoundedLTW01-Med.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './custom/DINNextRoundedLTW01-Bol.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-din-rounded',
  display: 'swap',
});

export const customFontVariables = [dm_sans.variable, space_mono.variable, dinNextRounded.variable].join(' ');
