import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import nextConfig from 'eslint-config-next';
import { config as baseConfig } from './base.js';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 * Aligned with the fixed config in apps/csk/eslint.config.mjs
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  ...baseConfig,
  js.configs.recommended,
  ...nextConfig,
  eslintConfigPrettier,
  {
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      // Override base config rules to match fixed config
      'prettier/prettier': 'error',
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      // TypeScript rules are included in eslint-config-next, override if needed
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_', varsIgnorePattern: '_' }],
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '@uniformdev/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@**/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'next',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'next**/**',
              group: 'builtin',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      // Enable react-hooks rules (eslint-config-next includes the plugin but not all rules)
      ...pluginReactHooks.configs.recommended.rules,
      'react-hooks/error-boundaries': 'error',
    },
  },
];
