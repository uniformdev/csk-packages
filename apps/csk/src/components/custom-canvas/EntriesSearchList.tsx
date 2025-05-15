'use client';
import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import ArticleResultCard from '@/components/custom-ui/ArticleResultCard';
import ProductResultCard from '@/components/custom-ui/ProductResultCard';
import { useEntriesSearchContext } from '@/providers/EntriesSearchContextProvider';
import { ContentType, Article, Product, WithUniformContentEntrySystemParams } from '@/types';
import { Loading } from '../custom-ui/Loading';

type EntriesSearchListParameters = {
  textColor?: string;
  border?: string;
};

type EntriesSearchListProps = ComponentProps<EntriesSearchListParameters>;

const EntriesSearchList: FC<EntriesSearchListProps> = ({ textColor, border }) => {
  const { entries, isLoading, clearFilters } = useEntriesSearchContext();

  const isEmpty = entries?.items.length === 0;

  return (
    <div className="relative">
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
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default EntriesSearchList;
