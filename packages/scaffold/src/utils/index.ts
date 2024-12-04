import { exec } from 'child_process';
import prettier, { Options } from 'prettier';
import { CanvasClient, ComponentDefinitionParameter } from '@uniformdev/canvas';
import { input } from '@inquirer/prompts';
import { supportedParameterHandlers } from '../parameterHandlers';
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
): (ComponentDefinitionParameter & { handler?: ParameterHandler })[] => {
  const handled = parameters.map(parameter => {
    const handler = supportedParameterHandlers.find(handler => {
      return handler.supports.includes(parameter.type);
    });
    return {
      ...parameter,
      handler,
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
