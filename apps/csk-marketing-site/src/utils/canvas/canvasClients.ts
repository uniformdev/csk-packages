import { CanvasClient } from '@uniformdev/canvas';

export const getCanvasClient = () => {
  const projectId = process.env.UNIFORM_PROJECT_ID;
  const apiKey = process.env.UNIFORM_API_KEY;
  const apiHost = process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app';
  const edgeApiHost = process.env.UNIFORM_CLI_BASE_EDGE_URL || 'https://uniform.global';

  if (!projectId) throw new Error('projectId is not specified. CanvasClient cannot be instantiated.');

  if (!apiKey) throw new Error('apiKey is not specified. CanvasClient cannot be instantiated');

  if (!apiHost) throw new Error('apiHost is not specified. CanvasClient cannot be instantiated');

  if (!edgeApiHost) throw new Error('edgeApiHost is not specified. CanvasClient cannot be instantiated');

  return new CanvasClient({
    apiKey,
    apiHost,
    projectId,
    edgeApiHost,
  });
};
