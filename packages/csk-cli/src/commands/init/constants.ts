import { EnvVariable, Module } from './types';

export const TEMPLATE_BRANCH_PREFIX = 'origin/templates/';

export const GIT_BRANCHES = {
  GOLD: process.env.GOLD_BRANCH || 'develop',
  FULL_PACK: process.env.FULL_PACK_BRANCH || 'full-pack',
};

export const GIT_COMMANDS = {
  DIFF_QUIET: `git diff --quiet origin/${GIT_BRANCHES.GOLD}`,
  RESET_HARD: `git reset --hard origin/${GIT_BRANCHES.GOLD}`,
  ALIGN_WITH_FULL_PACK_BRACH: `git restore --source=origin/${GIT_BRANCHES.FULL_PACK} -- .`,
  ALIGN_WITH_TEMPLATE_BRANCH: (template: string) =>
    `git restore --source=${TEMPLATE_BRANCH_PREFIX}${template} --worktree -- .`,
  GET_CHANGED_FILES: 'git ls-files --modified --others --exclude-standard',
  GIT_ADD: 'git add .',
  GIT_REMOTE_BRANCHES: 'git branch -r',
};

export const JSX_COMMENT_REGEX = /{\s*\/\*\s*\/\/\?\s*(.*?)\s*\*\/\s*}/g;

export const REQUIRED_ENV_VARIABLES: {
  [key in Module | 'general']: EnvVariable[];
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
};
