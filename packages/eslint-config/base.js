import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import path from 'path';

const project = path.resolve(process.cwd(), 'tsconfig.json');

export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    plugins: { turbo: turboPlugin },
    rules: {
      'turbo/no-undeclared-env-vars': 'off',
    },
  },
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: { project },
      },
    },
    rules: {
      'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_', varsIgnorePattern: '_' }],
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            { pattern: '@uniformdev/**', group: 'internal', position: 'before' },
            { pattern: '@**/**', group: 'internal', position: 'before' },
            { pattern: 'react', group: 'builtin', position: 'before' },
            { pattern: 'next', group: 'builtin', position: 'before' },
            { pattern: 'next**/**', group: 'builtin', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'next/**', 'storybook-static/**'],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project,
      },
    },
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      globals: {
        module: 'writable',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    files: [
      '**/tsup.config.ts',
      '**/jest.config.js',
      '**/cli.js',
      '**/.storybook/**/*.{js,ts}',
      '**/uniform.server.config.js',
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: false,
      },
    },
  },
];
