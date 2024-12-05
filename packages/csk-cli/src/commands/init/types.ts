export type Template = 'baseline';
export type Module = 'localization' | 'context-dev-tools' | 'ga' | 'uniform-insights';

export type EnvVariable =
  | 'UNIFORM_PROJECT_ID'
  | 'UNIFORM_API_KEY'
  | 'UNIFORM_CLI_BASE_URL'
  | 'UNIFORM_CLI_BASE_EDGE_URL'
  | 'UNIFORM_PREVIEW_SECRET'
  | 'UNIFORM_INSIGHTS_ENDPOINT'
  | 'UNIFORM_INSIGHTS_KEY';

export type ProjectConfiguration = {
  template: Template;
  modules: Module[];
  envVariables: Partial<Record<EnvVariable, string>>;
};
