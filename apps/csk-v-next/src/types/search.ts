import { Asset } from '@uniformdev/assets';
import { DataWithProperties } from '@uniformdev/canvas';
//Define the structure of a knowledge base article
interface SearchResult {
  id: string;
  title: string;
  shortDescription: string;

  thumbnail?: {
    value: Asset[];
  };
  author?: {
    entry: DataWithProperties;
  };
  tags?: {
    entry: DataWithProperties;
  }[];
  // Add other necessary fields if needed
}

// Define the structure of the response from the API
interface SearchResultsWithPagination {
  items: SearchResult[];
  page: number;
  perPage: number;
  totalCount: number;
  facets: Facets;
}

// Define a type for one facet's data
interface FacetValueCounts {
  [facetValue: string]: number;
}

// Define the Facets type for the entire response
interface Facets {
  [facetField: string]: FacetValueCounts;
}

export { type SearchResult, type SearchResultsWithPagination, type Facets, type FacetValueCounts };
