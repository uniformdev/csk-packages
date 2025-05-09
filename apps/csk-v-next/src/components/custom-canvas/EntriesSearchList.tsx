'use client';
import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { useEntriesSearchContext } from '@/modules/search/EntriesSearchContextProvider';
import { ContentType, Article, Product, WithUniformContentEntrySystemParams } from '@/modules/search/types';
import ArticleResultCard from '@/modules/search/ui/ArticleResultCard';
import ProductResultCard from '@/modules/search/ui/ProductResultCard';

type EntriesSearchListParameters = {
  textColor?: string;
  border?: string;
};

type EntriesSearchListProps = ComponentProps<EntriesSearchListParameters>;

const EntriesSearchList: FC<EntriesSearchListProps> = ({ textColor, border }) => {
  const { entries, isLoading, clearFilters, contentType } = useEntriesSearchContext();

  const isEmpty = entries?.items.length === 0;

  const renderContnt = () => {
    if (contentType === ContentType.Article) {
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {entries?.items.map(entry => {
          const entryContentType = entry.contentType as ContentType.Article | ContentType.Product;

          if (entryContentType === ContentType.Article) {
            const articleEntry = entry as WithUniformContentEntrySystemParams<Article>;
            return (
              <ArticleResultCard
                {...articleEntry}
                textColor={textColor}
                border={border}
                contentType={ContentType.Article}
                key={entry.id}
              />
            );
          }
          return null;
        })}
      </div>;
    } else if (contentType === ContentType.Product) {
      return (
        <div className="flex flex-col">
          <div className="grid grid-cols-7">
            <div className="border-r border-gray-300 bg-gray-200 px-4 py-2 text-center text-gray-500">Part #</div>
            <div className="border-r border-gray-300 bg-gray-200 px-4 py-2 text-center text-gray-500">Description</div>
            <div className="border-r border-gray-300 bg-gray-200 px-4 py-2 text-center text-gray-500">Applications</div>
            <div className="border-r border-gray-300 bg-gray-200 px-4 py-2 text-center text-gray-500">
              Product Status
            </div>
            <div className="border-r border-gray-300 bg-gray-200 px-4 py-2 text-center text-gray-500">RoHS</div>
            <div className="border-r border-gray-300 bg-gray-200 px-4 py-2 text-center text-gray-500">Lead Free</div>
            <div className=" bg-gray-200 px-4 py-2 text-center text-gray-500">Helogen Free</div>
          </div>
          {entries?.items.map(entry => {
            const entryContentType = entry.contentType as ContentType.Article | ContentType.Product;

            if (entryContentType === ContentType.Product) {
              const productEntry = entry as WithUniformContentEntrySystemParams<Product>;
              return (
                <ProductResultCard
                  {...productEntry}
                  textColor={textColor}
                  border={border}
                  contentType={ContentType.Product}
                  key={entry.id}
                />
              );
            }
            return null;
          })}
        </div>
      );
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-40 flex justify-center bg-white/75">
          <div className="py-[20%]">
            <svg
              className=" sticky top-1/2 size-10 animate-spin text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center gap-y-4 py-24">
          <div className="flex size-16 items-center justify-center rounded-full bg-gray-100">
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
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <p className="text-center text-xl">No results found</p>
          <p className="text-center text-sm text-gray-500">
            Please try again with different filters or{' '}
            <button className="underline hover:no-underline" onClick={clearFilters}>
              clear all filters
            </button>
          </p>
        </div>
      ) : (
        renderContnt()
      )}
    </div>
  );
};

export default EntriesSearchList;
