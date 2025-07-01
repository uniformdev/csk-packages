import { RouteClient } from '@uniformdev/canvas';
import { UncachedEnrichmentClient } from '@uniformdev/context/api';

// Get routes from Uniform
export const routeClient = new RouteClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
  edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL!,
});

// Get enrichments from Uniform
export const enrichmentClient = new UncachedEnrichmentClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
  apiHost: process.env.UNIFORM_CLI_BASE_URL!,
});

// Get content from Uniform
export { default as contentClient } from '@/utils/contentClient';
