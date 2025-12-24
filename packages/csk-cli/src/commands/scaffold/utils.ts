import { CanvasClient, ComponentDefinitionParameter } from '@uniformdev/canvas';
import { input } from '@inquirer/prompts';
import {
  THEME_PACK_PARAMETERS_TYPES,
  UNDER_STRIKE_REGEX,
  UNIFORM_PARAMETERS,
  UNIFORM_PARAMETERS_TYPES,
  VALID_KEY_REGEX,
} from './constants';
import { supportedParameterHandlers } from './parameterHandlers';
import { ParameterHandler } from './types';

export const getCanvasClient = async () => {
  let projectId = process.env.UNIFORM_PROJECT_ID;
  let apiKey = process.env.UNIFORM_API_KEY;
  const apiHost = process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app';
  const edgeApiHost = process.env.UNIFORM_CLI_BASE_EDGE_URL || 'https://uniform.global';

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

const overrideParameterId = (parameter: ComponentDefinitionParameter, index: number) => {
  const isUniformTextType = [UNIFORM_PARAMETERS_TYPES.TEXT, UNIFORM_PARAMETERS_TYPES.RICH_TEXT].includes(
    parameter.type as UNIFORM_PARAMETERS_TYPES
  );

  const isValidId = parameter.id?.match(VALID_KEY_REGEX);

  if (isUniformTextType) {
    const overriddenId = (isValidId ? `_${parameter.id}` : `_parameter${index}`).replace(UNDER_STRIKE_REGEX, '_');
    return overriddenId === '_' ? undefined : overriddenId;
  }

  return isValidId ? undefined : `parameter${index}`;
};

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
      const overriddenId = overrideParameterId(parameter, index + 1);

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
                  return handler.render({ ...parameter, id: overriddenId, canvasId: parameter.id });
                }
              },
            }
          : undefined,
      };
    });

  return handled.filter(parameter => !!parameter.handler);
};
