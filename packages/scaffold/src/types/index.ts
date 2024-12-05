import { ComponentDefinition, ComponentDefinitionParameter } from '@uniformdev/canvas';
import { IMPORTS, UNIFORM_PARAMETERS } from '../constants';

export type FileHandler = {
  path: (props: { pathToCanvasFolder: string; definition?: ComponentDefinition }) => Promise<string>;
  write: (props: { destinationPath: string; definition: ComponentDefinition }) => Promise<void>;
};

export type ParameterHandler = {
  import?: IMPORTS[];
  needsProps?: UNIFORM_PARAMETERS[];
  supports: string[];
  type: string;
  render: (parameter: ComponentDefinitionParameter) => string;
  hide?: boolean;
};
