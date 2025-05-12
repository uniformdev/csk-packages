'use client';
import { FC, useState } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import Button from '@/components/ui/Button';
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
  const { filterBy, selectedFilters, setSelectedFilters, facets, clearFilters } = useEntriesSearchContext();
  const [filters, setFilters] = useState<Record<string, string[]>>(selectedFilters);

  const handleFilterChange = (fieldId: string, value: string[]) => {
    setFilters({ ...filters, [fieldId]: value });
  };

  const handleReset = () => {
    clearFilters();
  };

  const handleApply = () => {
    setSelectedFilters(filters);
  };

  return (
    <div className="flex gap-x-4">
      {title && <div className="w-max font-font-din-rounded whitespace-nowrap text-lg font-bold">{title}</div>}
      <div className="flex flex-row flex-wrap gap-2">
        {filterBy.map(filter => {
          const Component = filterByComponents[filter.type];
          return (
            <div key={filter.fieldKey} className="flex flex-col gap-y-2">
              <Component
                {...filter}
                title={filter.title}
                selectedValues={filters[filter.fieldKey] || []}
                onFilterChange={handleFilterChange}
                facetValues={facets?.[filter.fieldKey] || {}}
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-start justify-between gap-y-2">
        <Button className="px-8 py-1.5" buttonColor="general-color-1" textColor="general-color-3" onClick={handleApply}>
          Apply
        </Button>

        <button className="text-sm font-bold text-general-color-1 hover:underline" onClick={handleReset}>
          Reset all
        </button>
      </div>
    </div>
  );
};

export default EntriesSearchFilters;
