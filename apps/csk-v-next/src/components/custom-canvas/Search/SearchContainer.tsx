'use client';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';

import { Grid, GridItem } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import Loading from '@/components/custom-ui/Loading';
import { Facets, SearchResult, SearchResultsWithPagination } from '@/types/search';
import { Facet } from './FilterPanel';
import SearchInput from './SearchInput';

const SearchResultCard = lazy(() => import('./SearchResultCard'));
const FilterPanel = lazy(() => import('./FilterPanel'));

export const SearchContainer = ({
  selectedFacets = [],
}: ComponentProps<SearchComponentProps, SearchComponentSlots>) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [facets, setFacets] = useState<Facets>({});
  const [filterDefs, setFilterDefs] = useState<{ filterName: string; filterField: string }[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const optionsArray = selectedFacets.map(pair => pair.trim()).filter(Boolean);

        const pairs = optionsArray.map(item => {
          const [filterName] = item.split(':').map(s => s.trim());
          return { filterName, filterField: 'fields.' + filterName };
        });

        //save pairs for FilterPanel
        setFilterDefs(pairs);
        // Build the facetBy string
        // e.g. "fields.category.name,fields.tags.name"
        const facetByParams = pairs.map(p => `${p.filterField}`).join(',');

        setIsLoading(true);

        const response = await fetch(
          `/api/search?search=${encodeURIComponent(searchTerm)}&filters=${encodeURIComponent(
            JSON.stringify(filters)
          )}&facetBy=${facetByParams}`
        );
        const data: SearchResultsWithPagination = await response.json();
        setSearchResults(data.items);

        // Store initial facets only once
        if (!Object.keys(facets).length) {
          setFacets(data.facets);
        }
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        setSearchResults([]);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    fetchSearchResults();
  }, [searchTerm, filters, selectedFacets, facets]);

  const handleFilterPanelChange = (filter: Record<string, string | null>) => {
    // If the user unchecks a box, remove that filter from state
    // If the user checks a box, set that filter
    const [facetName, value] = Object.entries(filter)[0];
    setFilters(prev => {
      if (prev[facetName]) {
        const prevValue = prev[facetName];

        const prevInValue = prevValue['in'];

        const newValue = prevInValue.includes(value)
          ? prevInValue.filter((v: string) => v !== value)
          : [value, ...prevInValue];

        if (newValue?.length === 0) {
          const temp = { ...prev };
          delete temp[facetName];
          return temp;
        }

        return { ...prev, [facetName]: { in: newValue } };
      }

      return { ...prev, [facetName]: { in: [value] } };
    });
  };

  // Turn the facets object into an array of { name, buckets } for FilterPanel
  const facetArray: Facet[] = facets
    ? Object.entries(facets).map(([facetName, facetValues]) => ({
        name: facetName,
        buckets: Object.entries(facetValues || {}).map(([val, count]) => ({
          value: val,
          count,
        })),
      }))
    : [];

  // Example: gather currently applied filters for displaying badges
  const activeFilters = Object.entries(filters).reduce<string[]>((acc, [, value]) => {
    if (value.in) {
      return [...acc, ...value.in];
    }
    return acc;
  }, []);

  const clearAllFilters = () => {
    setFilters({});
  };

  return (
    <div className="flex w-full gap-x-4">
      <Grid columnsCount={'12'} gapX="8" gapY="8">
        <GridItem columnStart={'1'} columnSpan={'span-3'}>
          <aside className="w-full">
            <h2 className="mb-4 text-xl font-bold">Filters</h2>
            <Suspense
              fallback={
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-5 w-1/2 rounded bg-gray-200" />
                      <div className="space-y-2">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="flex items-center space-x-2">
                            <div className="size-4 rounded bg-gray-200" />
                            <div className="h-4 w-2/3 rounded bg-gray-200" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              }
            >
              <FilterPanel facets={facetArray} filterDefs={filterDefs} onChange={handleFilterPanelChange} />
            </Suspense>
          </aside>
        </GridItem>
        <GridItem columnStart={'4'} columnSpan={'span-9'}>
          <main>
            <div>
              <SearchInput onSearch={setSearchTerm} />

              {activeFilters.length > 0 && (
                <div className="my-4 flex flex-wrap items-center gap-2">
                  {activeFilters.map(val => (
                    <div key={val} className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700">
                      {val}
                    </div>
                  ))}
                  <button onClick={clearAllFilters} className="ml-auto text-sm text-black">
                    Clear all
                  </button>
                </div>
              )}

              <div className="mt-4">
                <Suspense
                  fallback={
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-64 animate-pulse rounded-md border bg-white p-4">
                          <div className="mb-4 aspect-[3/2] bg-gray-200" />
                          <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
                          <div className="h-4 w-1/2 rounded bg-gray-200" />
                        </div>
                      ))}
                    </div>
                  }
                >
                  <div
                    className={cn('flex justify-center transition-all duration-300', {
                      'invisible h-0 opacity-0': !isLoading,
                      'visible py-8 opacity-100': isLoading,
                    })}
                  >
                    <Loading />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {searchResults === null ? (
                      [...Array(6)].map((_, i) => (
                        <div key={i} className="h-64 animate-pulse rounded-md border bg-white p-4">
                          <div className="mb-4 aspect-[3/2] bg-gray-200" />
                          <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
                          <div className="h-4 w-1/2 rounded bg-gray-200" />
                        </div>
                      ))
                    ) : searchResults?.length > 0 ? (
                      searchResults.map((r, key) => (
                        <div key={key} className="rounded-md border bg-white p-4 shadow-sm">
                          <Suspense>
                            <SearchResultCard {...r} />
                          </Suspense>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-8 text-center text-gray-500">
                        No searchResults found. Try adjusting your search or filters.
                      </div>
                    )}
                  </div>
                </Suspense>
              </div>
            </div>
          </main>
        </GridItem>
      </Grid>
    </div>
  );
};

export type SearchComponentProps = {
  selectedFacets: string[];
};

export type SearchComponentSlots = 'searchResults';

export default SearchContainer;
