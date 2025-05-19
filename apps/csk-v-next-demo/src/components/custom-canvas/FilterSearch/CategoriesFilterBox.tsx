'use client';

import { ChangeEvent, FC, useCallback, useMemo } from 'react';
import { ComponentInstance, flattenValues } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { SelectIcon } from '@/components/custom-canvas/DemoCard/icons';
import { useUniformSearchFilterEngineContext } from './ComponentsSearchProvider';

type CategoriesFilterBoxParameters = {
  title: string;
  filters?: {
    _id?: string;
    type: string;
    fields?: ComponentInstance['parameters'];
  }[];
};

type Filter = {
  filterName?: string;
  value?: string;
};

type CategoriesFilterBoxProps = ComponentProps<CategoriesFilterBoxParameters>;

const allCategoriesOption = { filterName: 'All', value: '' };

const CategoriesFilterBox: FC<CategoriesFilterBoxProps> = ({ title, filters }) => {
  const { setAllowCategoryIds } = useUniformSearchFilterEngineContext();

  const filtersToDisplay = useMemo(
    () => filters?.map(filter => flattenValues(filter) as Filter).filter(Boolean) || [],
    [filters]
  );

  const handleFilterSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedId = e.target.value;
      setAllowCategoryIds(prevState => {
        if (!selectedId) return [];
        return prevState.includes(selectedId) ? [] : [selectedId];
      });
    },
    [setAllowCategoryIds]
  );

  return (
    <div className="w-full">
      <p className="mb-1 text-sm font-semibold text-black dark:text-white md:mb-3 md:text-base lg:text-lg">{title}</p>
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <SelectIcon className="text-text-tertiary" />
        </div>
        <select
          onChange={handleFilterSelect}
          className="w-full appearance-none rounded-md border border-gray-300 bg-transparent px-4 py-3 pr-10 text-sm font-medium text-text-primary"
        >
          <option value={allCategoriesOption.value}>{allCategoriesOption.filterName}</option>
          {filtersToDisplay.map(({ filterName, value }) => (
            <option key={`${filterName}-${value}`} value={value}>
              {filterName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoriesFilterBox;
