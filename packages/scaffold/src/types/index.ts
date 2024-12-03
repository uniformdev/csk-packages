import { ComponentDefinition, ComponentDefinitionParameter } from '@uniformdev/canvas';

export type FileHandler = {
  path: (props: { pathToCanvasFolder: string; definition?: ComponentDefinition }) => Promise<string>;
  write: (props: { destinationPath: string; definition: ComponentDefinition }) => Promise<void>;
};

export type ParameterHandler = {
  import?: string[];
  needsProps?: string[];
  supports: string[];
  type: string;
  render: (parameter: ComponentDefinitionParameter) => string;
  hide?: boolean;
};
