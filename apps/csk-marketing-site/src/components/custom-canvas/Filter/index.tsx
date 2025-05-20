'use client';

import React, { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DataWithProperties, flattenValues } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { Image } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';

interface FilterKey {
  title?: string;
  slug?: string;
  id?: string;
  icon?: {
    url: string;
    title: string;
  }[];
}

interface FilterParameters {
  title: string;
  id: string;
  filterKeys: DataWithProperties[];
}

type RecipeFilterProps = ComponentProps<FilterParameters>;

const RecipeFilter: React.FC<RecipeFilterProps> = ({ id, filterKeys }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedFilterId = useMemo(() => searchParams.get(id) || 'all', [searchParams, id]);

  const mappedFilters = useMemo(
    () =>
      filterKeys.map(item => {
        const { title, slug, id, icon } = flattenValues(item) as FilterKey;
        return {
          title,
          slug,
          id,
          icon: icon?.[0],
        };
      }),
    [filterKeys]
  );

  const handleFilterChange = useCallback(
    (filterId: string | undefined) => {
      const params = new URLSearchParams(searchParams);
      if (filterId === 'all') {
        params.delete(id);
      } else {
        params.set(id, filterId || '');
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams, router, id]
  );

  return (
    <>
      {mappedFilters?.map(filter => {
        const isSelected = selectedFilterId === filter.id;
        return (
          <button
            key={filter.id}
            className="border-t border-[#D1D5DB] last-of-type:border-b"
            onClick={() => handleFilterChange(filter.id)}
          >
            <div
              className={cn(
                'flex flex-col justify-between mx-1 my-[2px] py-4 items-start hover:bg-sky-50 dark:hover:bg-[#0036CF]',
                {
                  'bg-[#DCEEFF] dark:bg-general-color-5': isSelected,
                }
              )}
            >
              <div className="flex gap-4 px-5">
                {filter?.icon && (
                  <div className="shrink-0">
                    <Image src={filter.icon.url} alt={filter.icon.title} width={25} height={25} />
                  </div>
                )}
                <p>{filter.title}</p>
              </div>
            </div>
          </button>
        );
      })}
    </>
  );
};

export default RecipeFilter;
