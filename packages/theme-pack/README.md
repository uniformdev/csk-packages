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
3. [Additional environment variable](#additional-environment-variable)

## Installation

To get started, install the package in your Next.js application:

```bash
npm i @uniformdev/theme-pack
```

## Setup Instructions

### Create CSS Folder

By default, the CSS files will be placed in the ./src/styles directory. You can also specify a custom path using the STYLES_PATH environment variable:

```dotenv
STYLES_PATH=
```

### Wrap Pages with ThemePackProvider

Wrap your page components using ThemePackProvider from @uniformdev/theme-pack/components:

```typescript jsx
import { notFound } from 'next/navigation';
import { ResolvedRouteGetResponse, RouteGetResponseEdgehancedComposition } from '@uniformdev/canvas';
import { PageParameters, retrieveRoute, UniformComposition } from '@uniformdev/canvas-next-rsc';
import { ThemePackProvider } from '@uniformdev/theme-pack/components';
import componentResolver from '@/components';

const isRouteWithoutErrors = (route: ResolvedRouteGetResponse): route is RouteGetResponseEdgehancedComposition =>
        'compositionApiResponse' in route && !!route.compositionApiResponse && 'composition' in route.compositionApiResponse;

export default async function Home(props: PageParameters) {
   const route = await retrieveRoute(props);

   if (!isRouteWithoutErrors(route)) return notFound();

   return (
           <ThemePackProvider>
              <UniformComposition {...props} route={route} resolveComponent={componentResolver} mode="server" />
           </ThemePackProvider>
   );
}
```

### Pull Design Tokens

Run the following command to pull and generate CSS variables for all design tokens:

```bash
theme-pack pull
```

### Import CSS Files

Import the generated CSS files into your layout.tsx or main layout component:

```jsx
import '@/styles/colors.css';
import '@/styles/dimensions.css';
import '@/styles/fonts.css';
import '@/styles/borders.css';
```

### Extend Tailwind Configuration

To extend Tailwind CSS with new classes and include generated design tokens, update your Tailwind configuration as shown below:

```typescript
import { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import {
  generateTailwindcssColorKeysPattern,
  generateTailwindcssDimensionKeysPattern,
  generateTailwindcssFontKeysPattern,
  generateTailwindcssBorderKeysPattern,
} from '@uniformdev/theme-pack/tailwindcss-conf';
import theme from './tailwind.config.theme.json';
import utilities from './tailwind.utilities.json';

const safelist = [];

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

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist,
  theme,
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities(utilities);
    }),
  ],
};

export default config;
```

## Additional environment variable

###  Custom integration url
```dotenv
INTEGRATION_URL=
CONFIG_PATH=
LOCALES_PATH=
```