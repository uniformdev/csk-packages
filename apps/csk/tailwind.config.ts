import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
//? if (shadcn) {
import tailwindcssAnimate from 'tailwindcss-animate';
//? }
import {
  generateTailwindcssColorKeysPattern,
  generateTailwindcssDimensionKeysPattern,
  generateTailwindcssFontKeysPattern,
  generateTailwindcssBorderKeysPattern,
} from '@uniformdev/design-extensions-tools/tailwindcss-conf';
import typography from '@tailwindcss/typography';
import theme from './tailwind.config.theme.json';
import utilities from './tailwind.utilities.json';

const safelist = [
  { pattern: /grid-cols-(1[0-2]|[1-9]|none|subgrid)/, variants: ['lg', 'md'] },
  { pattern: /gap(?:-(x|y))?-(0(\.5)?|1(\.5)?|2(\.5)?|3(\.5)?|[1-9]?[0-9]|px)/, variants: ['lg', 'md'] },
  { pattern: /flex-(col|row|col-reverse|row-reverse)/, variants: ['lg', 'md'] },
  { pattern: /justify-(normal|start|end|center|between|around|evenly|stretch)/, variants: ['lg', 'md'] },
  { pattern: /items-(start|end|center|baseline|stretch)/, variants: ['lg', 'md'] },
  { pattern: /self-(start|end|center|baseline|stretch)/, variants: ['lg', 'md'] },
  { pattern: /(col|row)-start-(1[0-2]|[1-9]|none|subgrid)/, variants: ['lg', 'md'] },
  { pattern: /(col|row)-(auto|span-(1[0-2]|[1-9]|full))/, variants: ['lg', 'md'] },
  { pattern: /justify-(start|center|end)/ },
  { pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/, variants: ['lg', 'md'] },
  { pattern: /text-(left|center|right)/ },
  { pattern: /font-(normal|medium|bold|extrabold)/, variants: ['lg', 'md'] },
  { pattern: /line-clamp-(none|[1-6])/, variants: ['lg:[&>:not(script)]', 'md:[&>:not(script)]', '[&>:not(script)]'] },
  { pattern: /(uppercase|lowercase|capitalize)/, variants: ['lg', 'md'] },
  { pattern: /(underline|overline|line-through)/, variants: ['lg', 'md'] },
  { pattern: /tracking-(tighter|tight|normal|wide|wider|widest)/, variants: ['lg', 'md'] },
  { pattern: /aspect-(auto|square|video)/ },
  { pattern: /shrink-(0|1)/ },
  { pattern: /opacity-(0|5|10|15|20|25|30|35|40|45|50|55|60|65|70|75|80|85|90|95|100)/, variants: ['hover'] },
  { pattern: /scale-(0|50|75|90|95|100|105|110|125|150)/, variants: ['hover'] },
];

const colorKeys = Object.keys(theme.extend.colors || {});
if (colorKeys.length) {
  safelist.push(
    generateTailwindcssColorKeysPattern(colorKeys, {
      prefixes: ['from', 'to'],
    })
  );
}

const dimensionKeys = Object.keys(theme.extend.spacing || {});
if (dimensionKeys.length) {
  safelist.push(...generateTailwindcssDimensionKeysPattern(dimensionKeys));
}

const fontKeys = Object.keys(theme.extend.fontFamily || {});
if (fontKeys.length) {
  safelist.push(generateTailwindcssFontKeysPattern(fontKeys));
}

const borderKeys = Object.keys(utilities || {}).map(key => key.substring(1));
if (borderKeys.length) {
  safelist.push(generateTailwindcssBorderKeysPattern(borderKeys));
}

export default {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    //? if (monorepo) {
    '../../node_modules/@uniformdev/csk-components/dist/content/**/*.{js,ts,jsx,tsx,mdx}',
    //? }
    //? if (!monorepo) {
    //? write('"./node_modules/@uniformdev/csk-components/dist/content/**/*.{js,ts,jsx,tsx,mdx}",');
    //? }
  ],
  safelist,
  //? if (shadcn) {
  theme: {
    ...theme,
    extend: {
      ...theme.extend,
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        ...theme.extend.colors,
      },
      animation: {
        shake: 'shake 0.6s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(-10deg)' },
          '40%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(-6deg)' },
          '80%': { transform: 'rotate(6deg)' },
        },
      },
    },
  },
  //? }
  //? if (!shadcn) {
  //? write('  theme: {\n');
  //? write('    ...theme,\n');
  //? write('    extend: {\n');
  //? write('      ...theme.extend,\n');
  //? write('      animation: {\n');
  //? write('        shake: "shake 0.6s ease-in-out infinite",\n');
  //? write('      },\n');
  //? write('      keyframes: {\n');
  //? write('        shake: {\n');
  //? write('          "0%, 100%": { transform: "rotate(0deg)" },\n');
  //? write('          "20%": { transform: "rotate(-10deg)" },\n');
  //? write('          "40%": { transform: "rotate(10deg)" },\n');
  //? write('          "60%": { transform: "rotate(-6deg)" },\n');
  //? write('          "80%": { transform: "rotate(6deg)" },\n');
  //? write('        },\n');
  //? write('      },\n');
  //? write('    },\n');
  //? write('  },\n');
  //? }
  plugins: [
    typography,
    //? if (shadcn) {
    tailwindcssAnimate,
    //? }
    plugin(function ({ addUtilities }) {
      addUtilities(utilities);
    }),
  ],
} satisfies Config;
