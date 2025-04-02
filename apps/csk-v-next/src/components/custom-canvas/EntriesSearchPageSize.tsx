'use client';
import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { useEntriesSearchContext } from '@/modules/search/EntriesSearchContextProvider';
import Select from '@/modules/search/ui/Select';
type EntriesSearchPageSizeProps = ComponentProps;

const EntriesSearchPageSize: FC<EntriesSearchPageSizeProps> = () => {
  const { pageSize, setPageSize, pageSizes } = useEntriesSearchContext();

  return (
    <Select className="min-w-[100px]" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
      {pageSizes.map(pageSize => (
        <option key={pageSize.size} value={pageSize.size}>
          {pageSize.size}
        </option>
      ))}
    </Select>
  );
};

export default EntriesSearchPageSize;
