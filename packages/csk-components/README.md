# @uniformdev/csk-components

`@uniformdev/csk-components` is a **Components Starter Kit** that provides a set of basic components for building websites within a Uniform project. These components can be used directly from the package or extracted into your project for customization.

## Installation

To use `@uniformdev/csk-components`, install it as a dependency in your project:

```bash
npm install @uniformdev/design-extensions-tools
npm install @uniformdev/csk-components
```

## Setup Instructions

### Create CSS Folder

By default, the CSS files will be placed in the `./src/styles` directory. You can also specify a custom path using the `STYLES_PATH` environment variable:

```dotenv
STYLES_PATH=
```

### Wrap Pages with DesignExtensionsProvider

Wrap your page using `DesignExtensionsProvider` from `@uniformdev/design-extensions-tools/components/providers/server`:

```typescript jsx
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  createServerUniformContext,
  ContextUpdateTransfer,
  PageParameters,
  UniformComposition,
} from '@uniformdev/canvas-next-rsc';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';
import { isRouteWithoutErrors } from '@uniformdev/csk-components/utils/routing';
import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
import { componentResolver } from '@/components';
import locales from '@/i18n/locales.json';
import retrieveRoute from '@/utils/retrieveRoute';

export default async function Home(props: PageParameters) {
  const route = await retrieveRoute(props, locales.defaultLocale);
  if (!isRouteWithoutErrors(route)) return notFound();

  const cookie = await cookies();
  const theme = cookie.get('theme')?.value || 'light';
  const searchParams = await props.searchParams;
  const serverContext = await createServerUniformContext({
    searchParams,
  });
  const isPreviewMode = searchParams?.preview === 'true';

  return (
    <DesignExtensionsProvider isPreviewMode={isPreviewMode}>
      <ContextUpdateTransfer
        serverContext={serverContext}
        update={{
          quirks: {
            theme,
          },
        }}
      />
      <UniformComposition
        {...props}
        route={route}
        resolveComponent={componentResolver}
        serverContext={serverContext}
        mode="server"
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
      />
    </DesignExtensionsProvider>
  );
}

export { generateMetadata } from '@/utils/metadata';

```
### Pull Design Tokens

Run the following command to pull and generate CSS variables for all design tokens:

```bash
design-extensions-tools pull
```

### Import CSS Files

Import the required CSS files into your `layout.tsx` or main layout component:

```jsx
import '@/styles/colors.css';
import '@/styles/dimensions.css';
import '@/styles/fonts.css';
import '@/styles/borders.css';
```

### Extend Tailwind Configuration

To extend Tailwind CSS with new classes and include generated design tokens, update your Tailwind configuration as follows:

```typescript
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import {
  generateTailwindcssColorKeysPattern,
  generateTailwindcssDimensionKeysPattern,
  generateTailwindcssFontKeysPattern,
  generateTailwindcssBorderKeysPattern,
} from '@uniformdev/csk-components/tailwindcss-conf';
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
];

const colorKeys = Object.keys(theme.extend.colors || {});
if (colorKeys.length) {
  safelist.push(generateTailwindcssColorKeysPattern(colorKeys));
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
    './node_modules/@uniformdev/csk-component/dist/content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist,
  theme,
  plugins: [
    typography,
    plugin(function ({ addUtilities }) {
      addUtilities(utilities);
    }),
  ],
} satisfies Config;

```

## Commands

### `extract` Command

The `extract` command allows you to copy the source code of canvas, UI, and content components (along with their utilities) directly into your project. This is useful if you want to modify components rather than importing them from the package.

#### Usage

First, add the following script to your `package.json`:

```json
"scripts": {
  "extract:components": "csk-components extract",
}
```

Run the command using:

```bash
npm run extract:components -- --components Text Button Accordion
```

#### Options

- `-c, --components <components...>` – Specifies which canvas components to extract. Example components include:
  
  ```
  Accordion, DemoHero, Banner, Carousel, Section, Text, Button, etc.
  ```

#### Example

Extract specific canvas components:

```bash
npm run extract:components -- --components Text Button Accordion
```

If no arguments are provided, the CLI will extract all available components.