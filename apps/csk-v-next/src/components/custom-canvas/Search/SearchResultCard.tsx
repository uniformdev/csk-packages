'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Asset } from '@uniformdev/assets';
import { flattenValues } from '@uniformdev/canvas';
import type { DataWithProperties } from '@uniformdev/canvas';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';

type SearchResultCardProps = {
  title: string;
  shortDescription: string;
  thumbnail?: {
    value: Asset[];
  };
  author?: {
    entry: DataWithProperties;
  };
  tags?: {
    entry: DataWithProperties;
  }[];
  slug: string;
};

export type Slots = string;

export const SearchResultCard = ({ title, shortDescription, thumbnail, author, tags, slug }: SearchResultCardProps) => {
  const pathname = usePathname();
  const newPath = `${pathname}/${slug}`;

  const [thumbnailAsset] = resolveAsset(thumbnail?.value);

  const flattenAuthor = flattenValues(author?.entry) as {
    name: string;
  };

  const flattenTags = tags?.map(tag => flattenValues(tag?.entry)) as {
    name: string;
  }[];

  return (
    <Link href={newPath}>
      <div className="flex h-full flex-col transition-all duration-300 hover:scale-105">
        <div className="flex flex-col">
          {thumbnailAsset ? (
            <div className="flex min-h-[200px] w-full items-center justify-center">
              <Image src={thumbnailAsset.url} alt={title} width={250} height={250} className="object-cover" />
            </div>
          ) : (
            <div className="flex aspect-[3/2] items-center justify-center bg-gray-200">
              <span className="text-gray-500">Image placeholder</span>
            </div>
          )}
        </div>
        <div className="flex h-full flex-col justify-between">
          <div className="p-4">
            <h1 className="mb-2 text-lg font-semibold">{title}</h1>
            <div className="text-sm text-gray-600">{shortDescription}</div>
          </div>
          <div>
            <div className="flex flex-wrap gap-3 px-4 text-[10px]">
              {flattenTags?.map(tag => (
                <span key={tag?.name} className="rounded-full bg-blue-200 px-4 py-1 text-black transition-all">
                  🏷️ {tag?.name}
                </span>
              ))}
              {flattenAuthor?.name && (
                <span className="rounded-full bg-orange-300 px-4 py-1 text-black transition-all">
                  ✍️ {flattenAuthor?.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
