'use client';
import { FC, useState, ChangeEvent } from 'react';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import Select from '@/components/custom-ui/Select';
import { useEntriesSearchContext } from '@/providers/EntriesSearchContextProvider';
import { buildOrderByQuery } from '@/utils/search';

type EntriesSearchSortingProps = ComponentProps<unknown, never>;

const EntriesSearchSorting: FC<EntriesSearchSortingProps> = ({ context }) => {
  const { orderBy, selectedOrderByQuery, setOrderBy } = useEntriesSearchContext();
  const [localOrderBy, setLocalOrderBy] = useState(selectedOrderByQuery);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocalOrderBy(value);
    setOrderBy(value);
  };

  if (!orderBy) {
    if (context.isContextualEditing) {
      return <div>Please add at least one order by field into Entries Search Engine component</div>;
    }
    return null;
  }

  return (
    <Select value={localOrderBy} onChange={handleChange}>
      {orderBy.map(order => {
        const value = buildOrderByQuery(order);
        return (
          <option key={value} value={value}>
            {order.title}
          </option>
        );
      })}
    </Select>
  );
};

export default withFlattenParameters(EntriesSearchSorting);
