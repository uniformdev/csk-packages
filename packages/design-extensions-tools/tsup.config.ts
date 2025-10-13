import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/components/providers/server.ts',
    'src/tailwindcss-conf.ts',
    'src/getTokenConfiguration.ts',
  ],
  format: ['esm'],
  dts: true,
  splitting: true,
  sourcemap: false,
  clean: true,
  minify: true,
});
