import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/types/cskTypes.ts',
    'src/tailwindcss-conf.ts',
    'src/utils/styling.ts',
    'src/utils/routing.ts',
    'src/utils/assets.ts',
    'src/utils/createEmptyPlaceholderResolver.tsx',
    'src/utils/createAppRouterComponentResolver.ts',
    'src/utils/createPagesRouterComponentResolver.ts',
    'src/utils/getSlotComponents.ts',
    'src/utils/withSlotsDataValue.tsx',
    'src/utils/withFlattenParameters.tsx',
    'src/utils/sitemap.ts',
    'src/new-components/adapters/app-router/index.ts',
    'src/new-components/adapters/pages-router/index.ts',
    'src/new-components/adapters/app-router/emptyPlaceholders.tsx',
  ],
  format: ['esm'],
  dts: true,
  splitting: true,
  sourcemap: false,
  clean: true,
  minify: true,
});
