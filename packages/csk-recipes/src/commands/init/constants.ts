import { EnvVariable, Recipe } from './types';

export const TEMPLATE_BRANCH_PREFIX = 'origin/templates/';

export const GIT_BRANCHES = {
  GOLD: process.env.GOLD_BRANCH || 'develop',
  FULL_PACK: process.env.FULL_PACK_BRANCH || 'full-pack',
};

export const RECIPES = ['localization', 'ga', 'uniform-insights', 'shadcn'];

export const TEMPLATES_TO_IGNORE = ['radiant'];

export const GIT_COMMANDS = {
  DIFF_QUIET: `git diff --quiet origin/${GIT_BRANCHES.GOLD}`,
  RESET_HARD: `git reset --hard origin/${GIT_BRANCHES.GOLD}`,
  ALIGN_WITH_FULL_PACK_BRACH: `git restore --source=origin/${GIT_BRANCHES.FULL_PACK} -- .`,
  ALIGN_WITH_TEMPLATE_BRANCH: (template: string) => `git cherry-pick -n ${TEMPLATE_BRANCH_PREFIX}${template} `,
  COMMIT_CHANGES: (message: string) => `git commit -m "${message}" --no-verify`,
  GIT_CREATE_BRANCH: (branchName: string) => `git checkout -b ${branchName}`,
  GIT_CREATE_BRANCH_FORCE: (branchName: string) => `git checkout ${branchName} && git reset --hard origin/develop`,
  GIT_CHECK_BRANCH_EXISTS: (branchName: string) => `git branch --list ${branchName}`,
  GET_CHANGED_FILES: 'git ls-files --modified --others --exclude-standard',
  GIT_ADD: 'git add .',
  GIT_RESET: 'git reset --hard',
  GIT_REMOTE_BRANCHES: 'git branch -r',
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
