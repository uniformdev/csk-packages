import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Configuration } from 'webpack';
import type { StorybookConfig } from '@storybook/nextjs';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  features: {
    experimentalRSC: true,
  },
  webpackFinal: async (config: Configuration) => {
    // Ensure Next.js modules are resolved from node_modules
    if (!config.resolve) {
      config.resolve = {};
    }

    // Get the app directory (csk-storybook)
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const appDir = join(currentDir, '..');
    const rootDir = join(appDir, '../..');

    // Configure module resolution to look in both app and root node_modules
    const existingModules = config.resolve.modules || [];
    const modulesArray = Array.isArray(existingModules) ? existingModules : existingModules ? [existingModules] : [];

    config.resolve.modules = [...modulesArray, join(appDir, 'node_modules'), join(rootDir, 'node_modules')];

    return config;
  },
};
export default config;

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}
