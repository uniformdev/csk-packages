import { ContentClient } from '@uniformdev/canvas';

const contentClient = new ContentClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
  apiHost: process.env.UNIFORM_CLI_BASE_URL!,
  edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL!,
});

export default contentClient;
