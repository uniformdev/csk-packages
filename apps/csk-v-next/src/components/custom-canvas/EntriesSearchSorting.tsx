'use client';
import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { useEntriesSearchContext } from '@/modules/search/EntriesSearchContextProvider';
import buildOrderByQuery from '@/modules/search/utils/buildOrderByQuery';

type EntriesSearchSortingProps = ComponentProps;

const EntriesSearchSorting: FC<EntriesSearchSortingProps> = ({ context }) => {
  const { orderBy, selectedOrderByQuery, setOrderBy } = useEntriesSearchContext();

  if (!orderBy) {
    if (context.isContextualEditing) {
      return <div>Please add at least one order by field into Entries Search Engine component</div>;
    }
    return null;
  }

  return (
    <div className="relative">
      <select
        value={selectedOrderByQuery}
        className="relative w-full p-input-large border-product-card"
        style={{ appearance: 'none' }}
        onChange={e => setOrderBy(e.target.value)}
      >
        {orderBy.map(order => {
          const value = buildOrderByQuery(order);
          return (
            <option key={value} value={value}>
              {order.title}
            </option>
          );
        })}
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-y-0 right-4 top-1/2 size-4 -translate-y-1/2"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
};

export default EntriesSearchSorting;
