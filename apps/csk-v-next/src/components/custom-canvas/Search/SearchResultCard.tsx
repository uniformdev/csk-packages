import React from 'react';
import Image from 'next/image';
import { Asset } from '@uniformdev/assets';
import { ComponentParameter, flattenValues } from '@uniformdev/canvas';

type Author = {
  name: string;
};
type Tag = {
  name: string;
};
type SearchResultCardProps = {
  title: string;
  shortDescription: string;
  thumbnail: {
    value: Asset[];
  };
  author: {
    entry: {
      fields: ComponentParameter<{
        name: string;
      }>;
    };
  };
  tags: {
    entry: {
      fields: ComponentParameter<{
        name: string;
      }>;
    };
  }[];
};

export type Slots = string;

export const SearchResultCard = ({ title, shortDescription, thumbnail, author, tags }: SearchResultCardProps) => {
  const assestUrl = thumbnail?.value?.[0]?.fields?.url?.value;

  const flattentAuthor = flattenValues(author?.entry as never) as never as Author;

  const flattentTags = tags?.map(tag => flattenValues(tag.entry as never)) as never as Tag[];

  return (
    <div className="flex h-full flex-col">
      {assestUrl ? (
        <div className="flex w-full items-center justify-center">
          <Image src={assestUrl} alt={title} width={250} height={250} className="object-cover" />
        </div>
      ) : (
        <div className="flex aspect-[3/2] items-center justify-center bg-gray-200">
          <span className="text-gray-500">Image placeholder</span>
        </div>
      )}
      <div className="p-4">
        <h1 className="mb-2 text-lg font-semibold">{title}</h1>
        <div className="text-sm text-gray-600">{shortDescription}</div>
      </div>
      <div>
        <div className="flex flex-wrap gap-2 p-4">
          <span className="rounded-full bg-orange-300 px-4 py-1">{flattentAuthor?.name}</span>
          {flattentTags?.map(tag => (
            <span key={tag?.name} className="rounded-full bg-blue-100 px-4 py-1">
              {tag?.name}
            </span>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SearchResultCard;
