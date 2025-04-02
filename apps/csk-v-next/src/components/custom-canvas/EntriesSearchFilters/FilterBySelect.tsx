import { useCallback, ChangeEvent, FC } from 'react';
import Checkbox from '@/modules/search/ui/Checkbox';
import { FilterByProps } from './EntriesSearchFilters';

const FilterBySelect: FC<FilterByProps> = ({ fieldKey, values, selectedValues, onFilterChange, facetValues, type }) => {
  const handleFilterChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (selectedValues.includes(value)) {
        onFilterChange(
          fieldKey,
          selectedValues.filter(filter => filter !== value)
        );
      } else {
        onFilterChange(fieldKey, type === 'multiSelect' ? [...selectedValues, value] : [value]);
      }
    },
    [selectedValues, onFilterChange, fieldKey, type]
  );

  return (
    <div className="flex flex-col gap-y-2">
      {values.map(({ value, title }) => (
        <Checkbox
          key={value}
          label={
            <span className="flex items-center gap-x-2">
              <span>{title}</span>
              {facetValues[value] && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{facetValues[value]}</span>
              )}
            </span>
          }
          value={value}
          checked={selectedValues.includes(value)}
          onChange={handleFilterChange}
        />
      ))}
    </div>
  );
};

export default FilterBySelect;
