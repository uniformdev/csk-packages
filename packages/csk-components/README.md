# Uniform Theme Pack JavaScript SDK

The **Uniform Theme Pack JavaScript SDK** provides a command-line interface (CLI) and utility functions to help you work with design tokens efficiently. It is part of the [Uniform Platform](https://uniform.app). For more details, refer to our [documentation](https://docs.uniform.app).

## Table of Contents

1. [Installation](#installation)
2. [Setup Instructions](#setup-instructions)
   - [Create CSS Folder](#create-css-folder)
   - [Wrap Pages with ThemePackProvider](#wrap-pages-with-themepackprovider)
   - [Pull Design Tokens](#pull-design-tokens)
   - [Import CSS Files](#import-css-files)
   - [Extend Tailwind Configuration](#extend-tailwind-configuration)
3. [Extractor CLI](#extractor-cli)
4. [Additional Environment Variables](#additional-environment-variables)

## Installation

To get started, install the package in your Next.js application:

```bash
npm i @uniformdev/theme-pack
```

## Setup Instructions

### Create CSS Folder

By default, the CSS files will be placed in the `./src/styles` directory. You can also specify a custom path using the `STYLES_PATH` environment variable:

```dotenv
STYLES_PATH=
```

### Wrap Pages with ThemePackProvider

Wrap your page using `ThemePackProvider` from `@uniformdev/csk-components/components/providers/server`:

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
import { ThemePackProvider } from '@uniformdev/csk-components/components/providers/server';
import { isRouteWithoutErrors } from '@uniformdev/csk-components/utils/routing';
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
    <ThemePackProvider isPreviewMode={isPreviewMode}>
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
    </ThemePackProvider>
  );
}

export { generateMetadata } from '@/utils/metadata';

```

### Pull Design Tokens

Run the following command to pull and generate CSS variables for all design tokens:

```bash
npx theme-pack pull
```

### Import CSS Files

Import the generated CSS files into your `layout.tsx` or main layout component:

```jsx
import '@/styles/colors.css';
import '@/styles/dimensions.css';
import '@/styles/fonts.css';
import '@/styles/borders.css';
```

### Extend Tailwind Configuration

To extend Tailwind CSS with new classes and include generated design tokens, update your Tailwind configuration as shown below:

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
    './node_modules/@uniformdev/csk-components/dist/content/**/*.{js,ts,jsx,tsx,mdx}',
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

## Extractor CLI

The **Extractor CLI** provides an easy way to extract components and modules for them from the package into your project. This tool supports two modes:

1. **Interactive Mode**: Allows you to select components and modules for them via a menu.
2. **Command Mode**: Enables quick extraction by specifying canvas components as arguments.

### Usage

To extract components and modules, use the `extract` command:

```bash
npx theme-pack extract
```

#### Options

- `-c, --components <components...>`: Extract specific canvas components. Example components include:

  ```
  Accordion, DemoHero, Banner, Carousel, Section, Text, Button, etc.
  ```

#### Example

Extract specific canvas components using command arguments:

```bash
npx theme-pack extract -c Text Button Accordion
```

If no arguments are provided, the CLI will prompt you with an interactive menu to select components.

## Additional Environment Variables

### Custom Integration URL

```dotenv
// Integration URL
INTEGRATION_URL=
// Path to the config file
CONFIG_PATH=
// Path to the locales file
LOCALES_PATH=
// Path to the components folder to extract components from packages  
COMPONENTS_PATH=
// Path to the module folders for extracted types, hocs and utils from packages
MODULES_PATH=
