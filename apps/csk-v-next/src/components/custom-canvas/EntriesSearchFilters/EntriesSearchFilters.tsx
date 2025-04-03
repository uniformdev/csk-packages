'use client';
import { FC, useCallback } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { useEntriesSearchContext } from '@/modules/search/EntriesSearchContextProvider';
import { FilterBy as FilterByType } from '@/modules/search/types';
import FilterByRange from './FilterByRange';
import FilterBySelect from './FilterBySelect';

export type FilterByProps = FilterByType & {
  selectedValues: string[];
  onFilterChange: (fieldId: string, value: string[]) => void;
  facetValues: Record<string, number>;
};

const EntriesSearchFilters: FC<ComponentProps> = () => {
  const { filterBy, selectedFilters, setSelectedFilters, facets } = useEntriesSearchContext();

  const handleFilterChange = useCallback(
    (fieldId: string, value: string[]) => {
      setSelectedFilters({ ...selectedFilters, [fieldId]: value });
    },
    [setSelectedFilters, selectedFilters]
  );

  const filterByComponents = {
    select: FilterBySelect,
    multiSelect: FilterBySelect,
    range: FilterByRange,
  };

  return (
    <div className="flex flex-col gap-y-10">
      {filterBy.map(filter => {
        const Component = filterByComponents[filter.type];
        return (
          <div key={filter.fieldKey} className="flex flex-col gap-y-2">
            <p className="text-lg font-bold">{filter.title}</p>
            <Component
              {...filter}
              selectedValues={selectedFilters[filter.fieldKey] || []}
              onFilterChange={handleFilterChange}
              facetValues={facets?.[filter.fieldKey] || {}}
            />
          </div>
        );
      })}
    </div>
  );
};

export default EntriesSearchFilters;
