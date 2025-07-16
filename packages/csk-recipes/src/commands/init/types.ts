export type Template = 'baseline' | 'coffee-shop' | string;
export type Recipe = 'localization' | 'ga' | 'uniform-insights' | 'shadcn' | 'ai-assistant' | 'ai-assistant-localized';

export type EnvVariable =
  | 'UNIFORM_PROJECT_ID'
  | 'UNIFORM_API_KEY'
  | 'UNIFORM_CLI_BASE_URL'
  | 'UNIFORM_CLI_BASE_EDGE_URL'
  | 'UNIFORM_PREVIEW_SECRET'
  | 'UNIFORM_INSIGHTS_ENDPOINT'
  | 'UNIFORM_INSIGHTS_KEY'
  | 'GOOGLE_ANALYTICS_ID'
  | 'OPENAI_API_KEY'
  | 'DATABASE_URL';

export type ProjectConfiguration = {
  template: Template;
  recipes: Recipe[];
  envVariables: Partial<Record<EnvVariable, string>>;
};
