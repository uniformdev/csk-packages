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
    'src/utils/createComponentResolver.ts',
    'src/hocs/withPlaygroundWrapper.tsx',
    'src/components/providers/server.ts',
    'src/components/ui/index.ts',
    'src/components/canvas/index.ts',
    'src/components/canvas/emptyPlaceholders.tsx',
  ],
  format: ['esm'],
  dts: true,
  splitting: true,
  sourcemap: false,
  clean: true,
  minify: true,
});
