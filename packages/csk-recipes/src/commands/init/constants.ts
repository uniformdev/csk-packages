import { EnvVariable, Recipe, Template } from './types';

export const TEMPLATE_BRANCH_PREFIX = 'refs/heads/templates/';
export const TEMPLATE_BRANCH_PREFIX_LOCAL = 'templates/';

export const GIT_BRANCHES = {
  GOLD: process.env.GOLD_BRANCH || 'main',
  BASELINE_RECIPES: process.env.BASELINE_RECIPES_BRANCH || 'baseline-recipes',
};

export const RECIPES = ['localization', 'ga', 'uniform-insights', 'shadcn'];

export const TEMPLATES_SPECIFIC_RECIPES: Partial<{
  [key in Template]: {
    name: string;
    value: Recipe;
  }[];
}> = {
  'coffee-shop': [
    {
      name: 'AI Assistant',
      value: 'ai-assistant',
    },
  ],
};

export const TEMPLATES = [
  {
    name: 'Coffee Shop',
    value: 'coffee-shop',
  },
];

export const RECIPE_SPECIFIC_BRANCHES = {
  'ai-assistant': 'coffee-shop-ai',
};

export const RECIPE_SPECIFIC_NOTES = {
  'ai-assistant': [
    `Before running your application and pushing your content, please make sure to create a Data Source with the following settings: 
     \t• Type: HTTP Request
     \t• Base URL:'https://uniform.app'
     \t• Query Parameter: 'projectId', and fill the value with the projectId of your Uniform project
     \t• Headers: 'X-Api-Key', and fill the value with the API key of your Uniform project
     \t• Public ID: 'uniformApp'`,
  ],
};

export const GIT_COMMANDS = {
  CHECK_IF_GIT: 'git status >/dev/null 2>&1',
  DIFF_QUIET: `[[ $(git rev-parse --abbrev-ref HEAD) == "${GIT_BRANCHES.GOLD}" ]] && [ -z "$(git status --porcelain)" ] && git diff --quiet origin/${GIT_BRANCHES.GOLD} && echo true || exit 1`,
  RESET_HARD: `git reset --hard origin/${GIT_BRANCHES.GOLD} && git clean -fd`,
  ALIGN_WITH_EXTERNAL_BRANCH: (branchName: string) =>
    `git clone https://github.com/uniformdev/csk-packages.git --branch ${branchName}`,
  GET_CHANGED_FILES: 'git ls-files --modified --others --exclude-standard',
};

export const JSX_COMMENT_REGEX = /{\s*\/\*\s*\/\/\?\s*(.*?)\s*\*\/\s*}/g;

export const REQUIRED_ENV_VARIABLES: {
  [key in Recipe]: EnvVariable[];
} = {
  'uniform-insights': ['UNIFORM_INSIGHTS_ENDPOINT', 'UNIFORM_INSIGHTS_KEY'],
  'ai-assistant': ['OPENAI_API_KEY', 'DATABASE_URL'],
  localization: [],
  ga: ['GOOGLE_ANALYTICS_ID'],
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

export const REQUIRED_UNIFORM_ENV_VARIABLES: EnvVariable[] = [
  'UNIFORM_PROJECT_ID',
  'UNIFORM_API_KEY',
  'UNIFORM_PREVIEW_SECRET',
];

export const RECIPE_ADDITIONAL_FILES: Partial<{
  [key in Recipe]: string[];
}> = {
  localization: [],
  ga: [],
  'uniform-insights': [],
  shadcn: ['components.json'],
};

export const META_NOT_PROCESABLE_FILE_PATH_SEGMENTS = ['content/', '.json', '.yaml', '.env.example', '.sql', '.md'];

export const FILES_TO_IGNORE_OUTSIDE_OF_MONOREPO = ['.lintstagedrc'];

export const PACKAGE_JSON_COPY_FILE = 'package-copy.json';

// Calculated based on the total number of steps and the percentage of each step depends on step complexity
export enum SETUP_PROJECT_STEP_PERCENTAGE {
  INITIAL_STEP = 0, // Start Set Up Project

  STEP_1 = 2.03, // Align with external branch
  STEP_2 = 10.01, // Install dependencies
  STEP_3 = 10.05, // Pre-process files
  STEP_4 = 95.31, // Process files
  STEP_5 = 96.34, // Post-process files
  STEP_6 = 97, // Install dependencies after processing the files
  STEP_7 = 98, // Add environment variables
  STEP_8 = 99, // Cleanup project

  FINAL_STEP = 100, // Final step
}
