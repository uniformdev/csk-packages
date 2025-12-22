'use client';
import { FC } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useUniformContext } from '@uniformdev/canvas-next-rsc-v2/component';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { useEntriesSearchContext } from '@/providers/EntriesSearchContextProvider';
import { FilterBy as FilterByType } from '@/types';
import FilterByRange from './FilterByRange';
import FilterBySelect from './FilterBySelect';

const filterByComponents = {
  select: FilterBySelect,
  multiSelect: FilterBySelect,
  range: FilterByRange,
};

// Maps field names to enrichment category names (handles casing differences)
const fieldToEnrichmentCat: Record<string, string> = {
  subcategory: 'subCategory',
};

export type FilterByProps = FilterByType & {
  selectedValues?: string[];
  onFilterChange?: (fieldId: string, value: string[]) => void;
  facetValues?: Record<string, number>;
};

const EntriesSearchFilters: FC<ComponentProps<unknown, never>> = () => {
  const { context } = useUniformContext();
  const { filteredFilterBy, selectedFilters, setSelectedFilters, facets } = useEntriesSearchContext();

  const handleFilterChange = useDebouncedCallback((fieldId: string, value: string[]) => {
    setSelectedFilters({ ...selectedFilters, [fieldId]: value });

    // Extract category from fieldId (e.g., "fields.brand.slug" -> "brand")
    const fieldParts = fieldId.split('.');
    const fieldName = fieldParts.length >= 2 ? fieldParts[1] : fieldId;
    const cat = fieldToEnrichmentCat[fieldName] ?? fieldName;

    // Create enrichments for each selected value
    const enrichments = value.map(key => ({
      cat,
      key,
      str: 5,
    }));

    context?.update({ enrichments });
  }, 600);

  return (
    <div className="flex flex-col gap-y-10">
      {filteredFilterBy?.map(filter => {
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
