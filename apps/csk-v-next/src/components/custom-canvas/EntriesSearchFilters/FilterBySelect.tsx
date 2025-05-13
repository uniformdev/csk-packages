import { useCallback, ChangeEvent, FC, useState, useRef, useEffect } from 'react';
import Checkbox from '@/modules/search/ui/Checkbox';
import { FilterByProps } from './EntriesSearchFilters';

const FilterBySelect: FC<FilterByProps> = ({
  fieldKey,
  title,
  values,
  selectedValues,
  onFilterChange,
  facetValues,
  type,
}) => {
  const [localSelectedValues, setLocalSelectedValues] = useState(selectedValues);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalSelectedValues(selectedValues);
  }, [selectedValues]);

  const handleFilterChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (localSelectedValues.includes(value)) {
        const newSelectedValues = localSelectedValues.filter(filter => filter !== value);
        setLocalSelectedValues(newSelectedValues);
        onFilterChange(fieldKey, newSelectedValues);
      } else {
        const newSelectedValues = type === 'multiSelect' ? [...localSelectedValues, value] : [value];
        setLocalSelectedValues(newSelectedValues);
        onFilterChange(fieldKey, newSelectedValues);
      }
    },
    [localSelectedValues, onFilterChange, fieldKey, type]
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block w-56 text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-between bg-gray-200 px-4 py-2 text-sm text-gray-500"
          onClick={() => setOpen(!open)}
        >
          {`${title} ${localSelectedValues.length > 0 ? `(${localSelectedValues.length})` : ''}`}
          <svg className="ml-2 size-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293L10 12l4.707-4.707-1.414-1.414L10 9.172 6.707 5.879 5.293 7.293z" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute z-10 mt-2 w-full border border-gray-200 bg-white shadow-lg">
          <ul className="flex max-h-60 flex-col gap-y-2 overflow-y-auto p-2">
            {values.map(({ value, title }) => (
              <Checkbox
                key={value}
                label={
                  <div className="flex w-full items-center justify-between gap-x-2">
                    <span>{title}</span>
                    {facetValues[value] && (
                      <span className="px-2 py-0.5 text-xs text-gray-500">({facetValues[value]})</span>
                    )}
                  </div>
                }
                value={value}
                checked={localSelectedValues.includes(value)}
                onChange={handleFilterChange}
              />
            ))}
          </ul>
          <div className="p-2 text-right">
            <button
              className="text-xs font-bold uppercase text-gray-500 hover:underline"
              onClick={() => {
                setLocalSelectedValues([]);
                onFilterChange(fieldKey, []);
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBySelect;
