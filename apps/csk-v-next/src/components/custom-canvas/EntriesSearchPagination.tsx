'use client';

import { FC, SVGProps } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useEntriesSearchContext } from '@/modules/search/EntriesSearchContextProvider';
import { DOTS, usePagination } from '@/modules/search/hooks/usePagination';

type EntriesSearchPaginationParameters = {
  siblingCount: number;
};
type EntriesSearchPaginationProps = ComponentProps<EntriesSearchPaginationParameters>;

const itemClasses = 'text-lg hover:scale-125 transition-transform disabled:pointer-events-none sm:mx-1 block';

const IconArrow: FC<SVGProps<SVGSVGElement>> = ({ className }) => (
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
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const EntriesSearchPagination: FC<EntriesSearchPaginationProps> = ({ siblingCount }) => {
  const { entries, setPage } = useEntriesSearchContext();
  const { page, perPage, total: totalCount } = entries;
  const currentPage = page + 1;
  const pagination = usePagination({ currentPage, totalCount, perPage, siblingCount });

  const onPrevious = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const lastPage = Number(pagination?.[pagination.length - 1]) || 0;

  const onNext = () => {
    if (currentPage < lastPage) {
      setPage(currentPage + 1);
    }
  };

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (!pagination || currentPage === 0 || pagination.length < 2) return null;

  return (
    <div className="mx-auto flex w-full items-center justify-between gap-x-7 sm:my-10 sm:w-max sm:justify-center">
      <button
        className={cn(itemClasses, 'group')}
        disabled={currentPage === 1}
        onKeyUp={onPrevious}
        onClick={onPrevious}
        aria-label="Previous page"
      >
        <IconArrow className="rotate-180 opacity-70 group-hover:opacity-100 group-disabled:opacity-50" />
      </button>
      {pagination.map(pageNumber =>
        pageNumber === DOTS ? (
          <button key="dots" className={cn(itemClasses, 'pointer-events-none !hidden sm:!block')}>
            &#8230;
          </button>
        ) : (
          <button
            key={`page-${pageNumber}`}
            className={cn('!hidden hover:text-grey-700 sm:!block', itemClasses, {
              'pointer-events-none font-bold text-grey-700': pageNumber === currentPage,
            })}
            onKeyUp={() => onPageChange(Number(pageNumber))}
            onClick={() => onPageChange(Number(pageNumber))}
            aria-label={`Page ${pageNumber}`}
          >
            {pageNumber}
          </button>
        )
      )}
      <span className="flex items-center gap-x-6 text-lg font-bold sm:hidden">
        <span>{currentPage}</span>
        <span className="font-normal">of</span>
        <span>{lastPage}</span>
      </span>
      <button
        className={cn(itemClasses, 'group ')}
        disabled={currentPage === lastPage}
        onKeyUp={onNext}
        onClick={onNext}
        aria-label="Next page"
      >
        <IconArrow className="opacity-70 group-hover:opacity-100 group-disabled:opacity-50" />
      </button>
    </div>
  );
};

export default EntriesSearchPagination;
