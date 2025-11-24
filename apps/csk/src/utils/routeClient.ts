import { RouteClient } from '@uniformdev/canvas';

const routeClient = new RouteClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
  edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL!,
});

export default routeClient;
