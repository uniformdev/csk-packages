import { ContentClient } from '@uniformdev/canvas';
import { getProjectMapClient } from '@uniformdev/canvas-next-rsc-v2';
import locales from '@/i18n/locales.json';

const ignoredPaths = ['/previews'];
const CHUNK_SIZE = 100;

export const hasDynamicParameters = (path: string) => {
  const dynamicParamPattern = /(^|\/):[A-Za-z_][\w-]*/;
  return dynamicParamPattern.test(path);
};

const getContentClient = () =>
  new ContentClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiHost: process.env.UNIFORM_API_HOST,
  });

const fetchRecursiveAllEntries = async <T>({ type }: { type: string }) => {
  const client = getContentClient();

  const fetchEntries = async (skip = 0): Promise<T[]> => {
    const res = await client.getEntries({
      filters: { type: { eq: type } },
      limit: CHUNK_SIZE,
      offset: skip,
      withTotalCount: true,
      skipDataResolution: true,
      skipOverridesResolution: true,
      skipPatternResolution: true,
    });

    const entries = (res.entries ?? []).map(e => e.entry as T);
    const total = res.totalCount ?? entries.length;

    if (skip + CHUNK_SIZE < total) {
      const next = await fetchEntries(skip + CHUNK_SIZE);
      return [...entries, ...next];
    }

    return entries;
  };

  return fetchEntries();
};

const getEntriesProjectMapNodes = async (type: string, nodeBasePath: string) => {
  const entries = await fetchRecursiveAllEntries<{ _slug?: string }>({
    type,
  });

  return entries
    .map(e => e._slug)
    .filter((s): s is string => !!s)
    .map(slug => `${nodeBasePath}/${slug}`);
};

const getAllStaticGeneratedPages = async () => {
  const [projectMapNodes, products, articles] = await Promise.all([
    getProjectMapClient({ cache: { type: 'default' } })
      .getNodes({ tree: false })
      .then(({ nodes }) => nodes?.map(({ path }) => path) ?? []),
    getEntriesProjectMapNodes('product', '/products'),
    getEntriesProjectMapNodes('article', '/articles'),
  ]);

  const preparedPaths = [...projectMapNodes, ...products, ...articles].flatMap(path => {
    if (path.includes(':locale')) {
      return (locales.locales as string[]).map(locale => path.replace(':locale', locale));
    }
    return [path];
  });

  const filtered = preparedPaths.filter(
    path => !ignoredPaths.some(ignoredPath => path.includes(ignoredPath)) && !hasDynamicParameters(path)
  );

  return Array.from(new Set(filtered));
};

export default getAllStaticGeneratedPages;
