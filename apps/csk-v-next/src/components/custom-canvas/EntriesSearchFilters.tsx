'use client';
import { ChangeEvent, FC, useCallback } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { useEntriesSearchContext } from '@/modules/search/EntriesSearchContextProvider';
import { FilterBy as FilterByType } from '@/modules/search/types';
import Checkbox from '@/modules/search/ui/Checkbox';

type FilterByProps = FilterByType & {
  selectedValues: string[];
  onFilterChange: (fieldId: string, value: string[]) => void;
  facetValues: Record<string, number>;
};

const FilterBy: FC<FilterByProps> = ({
  title,
  fieldKey,
  values,
  multiSelect,
  selectedValues,
  onFilterChange,
  facetValues,
}) => {
  const handleFilterChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (selectedValues.includes(value)) {
        onFilterChange(
          fieldKey,
          selectedValues.filter(filter => filter !== value)
        );
      } else {
        onFilterChange(fieldKey, multiSelect ? [...selectedValues, value] : [value]);
      }
    },
    [selectedValues, onFilterChange, fieldKey, multiSelect]
  );

  return (
    <div className="flex flex-col gap-y-2">
      <p className="text-lg font-bold">{title}</p>
      <div className="flex flex-col gap-y-2">
        {values.map(({ value, title }) => (
          <Checkbox
            key={value}
            label={
              <span className="flex items-center gap-x-2">
                <span>{title}</span>
                {facetValues[value] && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                    {facetValues[value]}
                  </span>
                )}
              </span>
            }
            value={value}
            checked={selectedValues.includes(value)}
            onChange={handleFilterChange}
          />
        ))}
      </div>
    </div>
  );
};

const EntriesSearchFilters: FC<ComponentProps> = () => {
  const { filterBy, selectedFilters, setSelectedFilters, facets } = useEntriesSearchContext();

  const handleFilterChange = useCallback(
    (fieldId: string, value: string[]) => {
      setSelectedFilters({ ...selectedFilters, [fieldId]: value });
    },
    [setSelectedFilters, selectedFilters]
  );

  return (
    <div className="flex flex-col gap-y-6">
      {filterBy.map(({ fieldKey, ...filter }) => (
        <FilterBy
          {...filter}
          key={fieldKey}
          fieldKey={fieldKey}
          selectedValues={selectedFilters[fieldKey] || []}
          onFilterChange={handleFilterChange}
          facetValues={facets?.[fieldKey] || {}}
        />
      ))}
    </div>
  );
};

export default EntriesSearchFilters;
