import { EnvVariable, Recipe } from './types';

export const TEMPLATE_BRANCH_PREFIX = 'refs/heads/templates/';
export const TEMPLATE_BRANCH_PREFIX_LOCAL = 'templates/';

export const GIT_BRANCHES = {
  GOLD: process.env.GOLD_BRANCH || 'develop',
  FULL_PACK: process.env.FULL_PACK_BRANCH || 'full-pack',
};

export const RECIPES = ['localization', 'ga', 'uniform-insights', 'shadcn'];

export const TEMPLATES_WHITE_LIST = ['coffee-shop'];

export const GIT_COMMANDS = {
  ALIGN_WITH_FULL_PACK_BRACH: `git clone https://github.com/uniformdev/csk-packages.git --branch ${GIT_BRANCHES.FULL_PACK}`,
  ALIGN_WITH_TEMPLATE_BRANCH: (template: string) =>
    `git clone https://github.com/uniformdev/csk-packages.git --branch ${TEMPLATE_BRANCH_PREFIX_LOCAL}${template} `,
  GIT_REMOTE_BRANCHES: 'git ls-remote --heads https://github.com/uniformdev/csk-packages.git',
};

export const JSX_COMMENT_REGEX = /{\s*\/\*\s*\/\/\?\s*(.*?)\s*\*\/\s*}/g;

export const REQUIRED_ENV_VARIABLES: {
  [key in Recipe | 'general']: EnvVariable[];
} = {
  general: [
    'UNIFORM_CLI_BASE_URL',
    'UNIFORM_CLI_BASE_EDGE_URL',
    'UNIFORM_PROJECT_ID',
    'UNIFORM_API_KEY',
    'UNIFORM_PREVIEW_SECRET',
  ],
  'uniform-insights': ['UNIFORM_INSIGHTS_ENDPOINT', 'UNIFORM_INSIGHTS_KEY'],
  localization: [],
  ga: [],
  shadcn: [],
};

export const ENV_VARIABLES_VARIANTS: Partial<{
  [key in EnvVariable]: string[];
}> = {
  UNIFORM_CLI_BASE_URL: ['https://uniform.app', 'https://canary.uniform.app'],
  UNIFORM_CLI_BASE_EDGE_URL: ['https://uniform.global', 'https://canary.uniform.global'],
};

export const ENV_VARIABLES_DEFAULT_VALUES: Partial<{
  [key in EnvVariable]: string;
}> = {
  UNIFORM_PREVIEW_SECRET: 'hello-world',
  UNIFORM_CLI_BASE_URL: 'https://uniform.app',
  UNIFORM_CLI_BASE_EDGE_URL: 'https://uniform.global',
};

export const RECIPE_ADDITIONAL_FILES: Partial<{
  [key in Recipe]: string[];
}> = {
  localization: [],
  ga: [],
  'uniform-insights': [],
  shadcn: ['components.json'],
};

export const META_NOT_PROCESABLE_FILE_EXTENSIONS = ['.json'];

export const FILES_TO_IGNORE_OUTSIDE_OF_MONOREPO = ['.lintstagedrc'];

export const TEMPLATE_PRE_PROCESS_FILE_WHITELIST = ['.lintstagedrc', 'package.json', 'tailwind.config.ts'];

export const PACKAGE_JSON_COPY_FILE = 'package-copy.json';
