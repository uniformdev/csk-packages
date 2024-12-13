import type { MetadataRoute } from 'next';
import { ProjectMapClient } from '@uniformdev/project-map';

const projectMap = new ProjectMapClient({
  apiHost: process.env.UNIFORM_CLI_BASE_URL,
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
});

const VERCEL_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = VERCEL_URL || 'http://localhost:3000';
  const { nodes } = await projectMap.getNodes({});

  return (nodes || []).map(node => ({
    url: `${domain}${node.path}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }));
}
