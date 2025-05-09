'use client';
import { FC } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { useEntriesSearchContext } from '@/modules/search/EntriesSearchContextProvider';
import { FilterBy as FilterByType } from '@/modules/search/types';
import FilterByRange from './FilterByRange';
import FilterBySelect from './FilterBySelect';

const filterByComponents = {
  select: FilterBySelect,
  multiSelect: FilterBySelect,
  range: FilterByRange,
};

export type FilterByProps = FilterByType & {
  selectedValues: string[];
  onFilterChange: (fieldId: string, value: string[]) => void;
  facetValues: Record<string, number>;
  title: string;
};

type EntriesSearchFiltersProps = ComponentProps<{
  title: string;
}>;

const EntriesSearchFilters: FC<EntriesSearchFiltersProps> = ({ title }) => {
  const { filterBy, selectedFilters, setSelectedFilters, facets } = useEntriesSearchContext();

  const handleFilterChange = useDebouncedCallback((fieldId: string, value: string[]) => {
    setSelectedFilters({ ...selectedFilters, [fieldId]: value });
  }, 600);

  return (
    <div className="flex items-center gap-x-4">
      {title && <p className="text-lg font-bold">{title}</p>}
      <div className="flex flex-row gap-x-2">
        {filterBy.map(filter => {
          const Component = filterByComponents[filter.type];
          return (
            <div key={filter.fieldKey} className="flex flex-col gap-y-2">
              <Component
                {...filter}
                title={filter.title}
                selectedValues={selectedFilters[filter.fieldKey] || []}
                onFilterChange={handleFilterChange}
                facetValues={facets?.[filter.fieldKey] || {}}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EntriesSearchFilters;
