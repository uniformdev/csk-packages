import { exec } from 'child_process';
import prettier, { Options } from 'prettier';
import { CanvasClient, ComponentDefinitionParameter } from '@uniformdev/canvas';
import { input } from '@inquirer/prompts';
import { supportedParameterHandlers } from './parameterHandlers';
import {
  THEME_PACK_PARAMETERS_TYPES,
  UNIFORM_PARAMETERS,
  UNIFORM_PARAMETERS_TYPES,
  VALID_KEY_REGEX,
} from '../constants';
import { ParameterHandler } from '../types';

export const getCanvasClient = async () => {
  const apiHost = process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app';
  const edgeApiHost = process.env.UNIFORM_CLI_BASE_EDGE_URL || 'https://uniform.global';
  let projectId = process.env.UNIFORM_PROJECT_ID;
  let apiKey = process.env.UNIFORM_API_KEY;

  if (!projectId) {
    projectId = await input({
      message: `We didn't find Uniform Project ID. Could you please provide it here:`,
      required: true,
    });
  }

  if (!apiKey) {
    apiKey = await input({
      message: `We didn't find Uniform API Key. Could you please provide it here:`,
      required: true,
    });
  }

  return new CanvasClient({
    apiHost,
    apiKey,
    projectId,
    edgeApiHost,
    disableSWR: true,
  });
};

export const getComponentNameBasedOnId = (componentId?: string) =>
  componentId ? componentId.charAt(0).toUpperCase() + componentId.slice(1) : 'UnknownComponent';

export const getSupportedParameters = (
  parameters: ComponentDefinitionParameter[]
): (ComponentDefinitionParameter & { handler?: ParameterHandler; overriddenId?: string })[] => {
  const reservedValues = Object.values(UNIFORM_PARAMETERS);
  const handled = parameters
    .filter(parameter => !reservedValues.includes(parameter.id as UNIFORM_PARAMETERS))
    .map((parameter, index) => {
      const handler = supportedParameterHandlers.find(handler => {
        return handler.supports.includes(parameter.type as UNIFORM_PARAMETERS_TYPES | THEME_PACK_PARAMETERS_TYPES);
      });
      const overriddenId = !parameter?.id?.match(VALID_KEY_REGEX) ? `parameter_${index}` : undefined;

      return {
        ...parameter,
        overriddenId,
        handler: handler
          ? {
              ...handler,
              render: (parameter: ComponentDefinitionParameter) => {
                if (!overriddenId) {
                  return handler.render(parameter);
                } else {
                  return handler.render({ ...parameter, id: overriddenId });
                }
              },
            }
          : undefined,
      };
    });

  return handled.filter(parameter => !!parameter.handler);
};

export const formatWithPrettier = (source: string, option?: Options) =>
  prettier.format(source, {
    parser: 'typescript',
    printWidth: 120,
    singleQuote: true,
    semi: true,
    trailingComma: 'es5',
    tabWidth: 2,
    arrowParens: 'avoid',
    endOfLine: 'auto',
    ...option,
  });

export const runCmdCommand = async (command: string): Promise<string> =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error.message);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  });
