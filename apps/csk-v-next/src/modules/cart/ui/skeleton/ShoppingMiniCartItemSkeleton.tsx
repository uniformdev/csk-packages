import { FC } from 'react';

export const ShoppingMiniCartItemSkeleton: FC = () => (
  <div className="border-b p-4 sm:px-14">
    <div className="flex flex-col py-3">
      <div className="basis-3/5">
        <div className="mb-4 block h-5 w-16 rounded bg-gray-200 font-bold"></div>
        <div className="flex flex-col py-4">
          <div className="flex flex-row justify-between">
            <div className="size-28 flex-initial rounded border border-slate-300 bg-gray-200"></div>
            <div className="relative inline-flex size-5 items-center rounded-full bg-gray-200"></div>
          </div>
          <div className="flex flex-col justify-between py-4 pb-0">
            <div className="group cursor-pointer">
              <div className="max-w-2xl">
                <div className="h-6 w-3/4 rounded bg-gray-200"></div>
              </div>
            </div>
            <div className="group relative mt-8 hidden h-5 items-center">
              <div className="h-4 w-20 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex basis-2/5 flex-row justify-between">
        <div>
          <div className="block pb-2 font-bold">QTY</div>
          <div className="flex h-[50px] w-44 flex-row justify-between border border-gray-100">
            <div className="h-full w-14 bg-gray-200"></div>
            <div className="flex w-full items-center justify-center border-x border-gray-100">
              <div className="h-4 w-6 rounded bg-gray-200"></div>
            </div>
            <div className="h-full w-14 bg-gray-200"></div>
          </div>
        </div>
        <div>
          <div className="block pb-2 font-bold">Price</div>
          <div className="h-6 w-20 rounded bg-gray-200 text-xl md:text-2xl"></div>
        </div>
      </div>
    </div>
  </div>
);
