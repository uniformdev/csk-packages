import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';
import theme from './tailwind.config.theme.json';
import utilities from './tailwind.utilities.json';

export default {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@uniformdev/csk-components/dist/content/**/*.{js,ts,jsx,tsx,mdx}',
    './safelist.txt',
  ],
  theme,
  plugins: [
    typography,
    plugin(function ({ addUtilities }) {
      addUtilities(utilities);
    }),
  ],
} satisfies Config;
