import { ProjectMapClient } from '@uniformdev/project-map';

const projectMapClient = new ProjectMapClient({
  apiKey: process.env.UNIFORM_API_KEY,
  apiHost: process.env.UNIFORM_CLI_BASE_URL,
  projectId: process.env.UNIFORM_PROJECT_ID,
});

export default projectMapClient;
