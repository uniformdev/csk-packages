import type { MetadataRoute } from 'next';
import { ProjectMapClient, getNodeActiveCompositionEdition } from '@uniformdev/project-map';

const projectMap = new ProjectMapClient({
  apiHost: process.env.UNIFORM_CLI_BASE_URL! || 'https://uniform.app',
  apiKey: process.env.UNIFORM_API_KEY!,
  projectId: process.env.UNIFORM_PROJECT_ID!,
});

/**
 * Generates the cartesian product of an array of arrays.
 * Each combination consists of one element from each input array.
 *
 * @param arrays - An array of arrays of strings.
 * @returns All possible combinations of the input arrays.
 */
const cartesianProduct = (arrays: string[][]): string[][] =>
  arrays.reduce<string[][]>((acc, curr) => acc.flatMap(a => curr.map(b => [...a, b])), [[]]);

/**
 * Generates all static path variations by substituting dynamic parameters
 * in the given path template using values provided in dynamicValues.
 *
 * @param dynamicValues - A record of parameter names to possible values.
 * @param pathTemplate - A URL path template containing colon-prefixed dynamic segments.
 * @returns An array of fully substituted static paths.
 */
const generatePaths = (dynamicValues: Record<string, string | string[]>, pathTemplate: string): string[] => {
  const paramMatches = [...pathTemplate.matchAll(/:([a-zA-Z0-9_]+)/g)];

  if (paramMatches.length === 0) return [pathTemplate];

  const paramNames = paramMatches.map(match => match[1]);

  const paramValues: string[][] = paramNames.map(name => {
    const value = dynamicValues[name as keyof typeof dynamicValues];
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  });

  const combinations = cartesianProduct(paramValues);

  return combinations.map(combo =>
    paramNames.reduce<string>((path, param, i) => path.replace(`:${param}`, combo[i]!), pathTemplate)
  );
};

/**
 * Returns an async function that generates a sitemap using the provided domain and dynamic values.
 * It fetches all composition nodes from Uniform Project Map, resolves their paths,
 * and returns sitemap entries with fully substituted URLs.
 *
 * @param domain - The base domain to prepend to each generated path (e.g., https://example.com).
 * @param dynamicValues - A record of dynamic variables and their possible values.
 * @returns A function that resolves to an array of MetadataRoute.Sitemap entries.
 *
 * @example
 * export default generateSitemap('https://example.com', {
 *   locale: ['en', 'fr'],
 *   category: ['tech', 'health'],
 * });
 * // sitemap will contain all path combinations for provided dynamic values and your Project Map nodes
 */
export const generateSitemap =
  (domain: string, dynamicValues: Record<string, string | string[]> = {}) =>
  async (): Promise<MetadataRoute.Sitemap> => {
    const { nodes } = await projectMap.getNodes({ withCompositionData: true });

    if (!nodes) return [];

    return nodes
      .filter(node => node.type === 'composition')
      .flatMap(node => {
        const edition = getNodeActiveCompositionEdition({
          node,
          targetLocale: undefined,
        });

        const paths = generatePaths(dynamicValues, node.path);

        return paths.map(path => ({
          url: `${domain}${path}`,
          lastModified: edition?.modified,
          changeFrequency: 'daily',
          priority: 1,
        }));
      });
  };
