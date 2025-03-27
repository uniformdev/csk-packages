import { FC } from 'react';

export const ShoppingCartItemSkeleton: FC = () => (
  <div className="flex flex-col gap-4 border-b py-6 md:flex-row">
    {/* Image + Title */}
    <div className="flex basis-3/5 flex-col gap-4 md:flex-row">
      <div className="size-28 rounded bg-gray-200 lg:size-44"></div>
      <div className="flex flex-1 flex-col justify-between py-2 md:px-6">
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
        <div className="mt-4 hidden items-center gap-2 md:inline-flex">
          <div className="size-4 rounded-full bg-gray-200"></div>
          <div className="h-4 w-20 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>

    {/* Qty & Price */}
    <div className="mt-6 flex basis-2/5 items-center justify-between md:mt-0 md:pb-6 md:pt-8">
      {/* Quantity controls */}
      <div className="flex h-[50px] w-44 items-center justify-between rounded bg-gray-100">
        <div className="h-full w-12 bg-gray-300"></div>
        <div className="h-full w-16 bg-gray-200"></div>
        <div className="h-full w-12 bg-gray-300"></div>
      </div>

      {/* Price */}
      <div className="h-6 w-20 rounded bg-gray-200"></div>
    </div>
  </div>
);
