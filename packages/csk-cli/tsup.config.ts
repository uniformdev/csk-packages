import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/proxy-fetch.ts'],
  format: ['esm'],
  dts: true,
  splitting: true,
  sourcemap: false,
  minify: true,
  clean: true,
});
