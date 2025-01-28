import { ComponentDefinition, ComponentDefinitionParameter } from '@uniformdev/canvas';
import { IMPORTS, THEME_PACK_PARAMETERS_TYPES, UNIFORM_PARAMETERS, UNIFORM_PARAMETERS_TYPES } from './constants';

export type FileHandler = {
  path: (props: { pathToCanvasFolder: string; definition?: ComponentDefinition }) => Promise<string>;
  write: (props: { destinationPath: string; definition: ComponentDefinition }) => Promise<void>;
};

export type ParameterHandler = {
  import?: IMPORTS[];
  needsProps?: UNIFORM_PARAMETERS[];
  supports: UNIFORM_PARAMETERS_TYPES | THEME_PACK_PARAMETERS_TYPES;
  type: string;
  render: (parameter: ComponentDefinitionParameter & { canvasId?: string }) => string;
  hideDestructuring?: boolean;
};
