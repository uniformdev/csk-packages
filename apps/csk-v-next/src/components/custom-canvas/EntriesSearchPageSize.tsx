'use client';
import { FC, useState } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { useEntriesSearchContext } from '@/modules/search/EntriesSearchContextProvider';
import Select from '@/modules/search/ui/Select';
type EntriesSearchPageSizeProps = ComponentProps;

const EntriesSearchPageSize: FC<EntriesSearchPageSizeProps> = () => {
  const { pageSize, setPageSize, pageSizes } = useEntriesSearchContext();
  const [localPageSize, setLocalPageSize] = useState(pageSize);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

export default EntriesSearchPageSize;
