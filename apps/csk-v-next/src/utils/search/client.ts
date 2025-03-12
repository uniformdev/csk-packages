import { CANVAS_PUBLISHED_STATE, ContentClient, EntryFilters, GetEntriesResponse } from '@uniformdev/canvas';
import { SearchResultsWithPagination, SearchResult } from '@/types/search';

export enum UniformContentType {
  ARTICLE = 'article',
}
const getContentClient = () => {
  return new ContentClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
    edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL,
  });
};

export const getMemoizedContentClient = (() => {
  let contentClient: ContentClient;
  return () => {
    if (!contentClient) contentClient = getContentClient();
    return contentClient;
  };
})();

export const getKnowledgeBaseArticles = async ({
  page = 0,
  perPage = 10,
  filters = {},
  search = '',
  orderBy,
  facetFields = [],
}: {
  page?: number;
  perPage?: number;
  preview?: boolean;
  filters?: EntryFilters;
  search?: string;
  orderBy?: string;
  facetFields?: string[]; // Renamed from `facets` to `facetFields`
}): Promise<SearchResultsWithPagination> => {
  const response = await getMemoizedContentClient().getEntries({
    filters: {
      ...filters,
      type: { eq: UniformContentType.ARTICLE },
    },
    state: CANVAS_PUBLISHED_STATE,
    skipPatternResolution: true,
    resolutionDepth: 2,
    limit: perPage,
    offset: page * perPage,
    search,
    locale: 'en',
    orderBy: orderBy ? [orderBy] : ['updated_at_ASC'],
    withTotalCount: true,
    facetBy: facetFields.join(','), // Use join to create comma-separated string if necessary
  });

  const { facets = {} } = response as GetEntriesResponse; // Facets in response remain unchanged
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: SearchResult[] = response.entries.map((entryResponse: any) => {
    const entry = entryResponse.entry;
    return {
      id: entry._id,
      title: entry.fields.title.value,
      shortDescription: entry.fields.shortDescription.value,
      thumbnail: entry.fields.thumbnail,
      slug: entry._slug || undefined,
      author: entry.fields.author?.value,
      tags: entry.fields.tags?.value,
      contentType: entry.type,
    };
  });

  return {
    items: items,
    page,
    perPage,
    totalCount: response.totalCount!,
    facets: facets, // Return response facets
  };
};
