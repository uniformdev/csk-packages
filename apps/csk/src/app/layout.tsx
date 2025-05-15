import { ReactNode } from 'react';

import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/dimensions.css';
import '@/styles/fonts.css';
import '@/styles/borders.css';

export default async function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
