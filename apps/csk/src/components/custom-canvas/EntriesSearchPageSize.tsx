'use client';

import { FC, useEffect, useState, ChangeEvent } from 'react';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import Select from '@/components/custom-ui/Select';
import { useEntriesSearchContext } from '@/providers/EntriesSearchContextProvider';

type EntriesSearchPageSizeProps = ComponentProps<unknown, never>;

const EntriesSearchPageSize: FC<EntriesSearchPageSizeProps> = () => {
  const { pageSize, setPageSize, pageSizes, isLoading } = useEntriesSearchContext();
  const [localPageSize, setLocalPageSize] = useState(pageSize);

  useEffect(() => {
    if (pageSize !== localPageSize && !isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalPageSize(pageSize);
    }
  }, [pageSize, localPageSize, isLoading]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (isLoading) return;
    const value = e.target.value;
    setLocalPageSize(Number(value));
    setPageSize(Number(value));
  };

  return (
    <Select className="min-w-[100px]" value={localPageSize} onChange={handleChange}>
      {pageSizes.map(pageSize => (
        <option key={pageSize.size} value={pageSize.size}>
          {pageSize.size}
        </option>
      ))}
    </Select>
  );
};

export default withFlattenParameters(EntriesSearchPageSize);
