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
import { notFound } from 'next/navigation';
import { CANVAS_EDITOR_STATE } from '@uniformdev/canvas';
import {
  resolveRouteFromCode,
  UniformComposition,
  UniformPageParameters,
  createUniformStaticParams,
} from '@uniformdev/canvas-next-rsc-v2';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';
import { compositionCache } from '@uniformdev/csk-components/utils/getSlotComponents';
import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
import { componentResolver } from '@/components';
import getAllStaticGeneratedPages from '@/utils/getAllStaticGeneratedPages';

export const generateStaticParams = async () => {
  const paths = await getAllStaticGeneratedPages();
  return createUniformStaticParams({
    paths,
  });
};

export default async function UniformPage(props: UniformPageParameters) {
  const result = await resolveRouteFromCode(props);

  if (!result.route) {
    notFound();
  }

  return (
    <DesignExtensionsProvider isPreviewMode={result.pageState.compositionState === CANVAS_EDITOR_STATE}>
      <UniformComposition
        {...result}
        resolveComponent={componentResolver}
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
        compositionCache={compositionCache}
      />
    </DesignExtensionsProvider>
  );
}

export { generateMetadata } from '@/utils/metadata';


```

### Pull Design Tokens

Run the following command to pull and generate CSS variables for all design tokens:

First, add the following scripts to your `package.json`:

```json
"scripts": {
    "pull:dex": "design-extensions-tools pull",
    "apply:dex": "design-extensions-tools apply",
    "push:dex": "design-extensions-tools push",
}
```

```bash
npm run pull:dex
npm run apply:dex
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

To extend Tailwind CSS with new classes and include generated design tokens, update your globals.css file as follows:

```typescript
@import 'tailwindcss' source(none);

@source '../components/**/*.{js,ts,jsx,tsx,mdx}';
@source '../app/**/*.{js,ts,jsx,tsx,mdx}';
@source '../../../../packages/csk-components/**/*.{js,ts,jsx,tsx,mdx}';

@import './tailwindcss.colors.css';
@import './tailwindcss.dimension.css';
@import './tailwindcss.font.css';
@import './tailwindcss.border.css';

@source inline("{lg:,md:,}grid-cols-{1,2,3,4,5,6,7,8,9,10,11,12,none,subgrid}");
@source inline("{lg:,md:,}gap-{0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,8,10,12,16,20,24,32,40,48,56,64,72,80,96,px}");
@source inline("{lg:,md:,}gap-x-{0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,8,10,12,16,20,24,32,40,48,56,64,72,80,96,px}");
@source inline("{lg:,md:,}gap-y-{0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,8,10,12,16,20,24,32,40,48,56,64,72,80,96,px}");
@source inline("{lg:,md:,}p{x,}-{0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,8,10,12,16,20,24,32,40,48,56,64,72,80,96,px}");
@source inline("{lg:,md:,}m{x,}-{0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,8,10,12,16,20,24,32,40,48,56,64,72,80,96,px}");
@source inline("{lg:,md:,}-m{x,}-{0,1,2,3,4,5,6,8,10,12,16,20,24,32,40,48,56,64,72,80,96,px}");
@source inline("{lg:,md:,}flex-{col,row,col-reverse,row-reverse}");
@source inline("{lg:,md:,}justify-{normal,start,end,center,between,around,evenly,stretch}");
@source inline("{lg:,md:,}items-{start,end,center,baseline,stretch}");
@source inline("{lg:,md:,}self-{start,end,center,baseline,stretch}");
@source inline("{lg:,md:,}{col,row}-start-{1,2,3,4,5,6,7,8,9,10,11,12,none,subgrid}");
@source inline("{lg:,md:,}{col,row}-{auto,span-{1,2,3,4,5,6,7,8,9,10,11,12},span-full}");
@source inline("{lg:,md:,}justify-{start,center,end}");
@source inline("{lg:,md:,}flex-{nowrap,wrap,wrap-reverse}");
@source inline("{lg:,md:,}text-{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl,6xl,7xl,8xl,9xl}");
@source inline("text-{left,center,right}");
@source inline("{lg:,md:,}font-{normal,medium,bold,extrabold}");
@source inline("{lg:,md:,}prose-{sm,base,lg,xl,2xl}");
@source inline("{lg:,md:,}line-clamp-{none,1,2,3,4,5,6}");
@source inline("{lg:,md:,}{uppercase,lowercase,capitalize}");
@source inline("{lg:,md:,group-hover:,}{underline,overline,line-through}");
@source inline("{lg:,md:,}tracking-{tighter,tight,normal,wide,wider,widest}");
@source inline("aspect-{auto,square,video}");
@source inline("shrink-{0,1}");
@source inline("{hover:,group-hover:,}opacity-{0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100}");
@source inline("{hover:,group-hover:,}scale-{0,50,75,90,95,100,105,110,125,150}");
@source inline("h-{full,screen}");

@custom-variant dark (&:where(.dark, .dark *));

@plugin "@tailwindcss/typography";
```

## Commands

### `extract` Command

The `extract` command allows you to copy the source code of canvas, UI, and content components (along with their utilities) directly into your project. This is useful if you want to modify components rather than importing them from the package.

#### Usage

First, add the following script to your `package.json`:

```json
"scripts": {
    "component:extract": "csk-components extract",
}
```

Run the command using:

```bash
npm run component:extract
```

#### Options

- `-c, --components <components...>` – Specifies which canvas components to extract. Example components include:

  ```
  Accordion, DemoHero, Banner, Carousel, Section, Text, Button, etc.
  ```

#### Example

Extract specific canvas components:

```bash
npm run component:extract -- --components Text Button Accordion
```

If no arguments are provided, the CLI will extract all available components.
