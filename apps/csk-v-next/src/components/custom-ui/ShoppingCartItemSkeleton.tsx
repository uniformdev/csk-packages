const ShoppingCartItemSkeleton = () => (
  <div className="grid animate-pulse grid-cols-1 gap-4 p-4 md:grid-cols-12 lg:grid-cols-12">
    <div className="md:col-span-3 lg:col-span-2">
      <div className="h-[170px] w-full rounded bg-gray-200"></div>
    </div>

    <div className="flex flex-col justify-between gap-4 md:col-span-4 lg:col-span-4">
      <div className="space-y-4">
        <div className="h-6 w-3/4 rounded bg-gray-200"></div>
        <div className="flex gap-2">
          <div className="h-4 w-10 rounded bg-gray-200"></div>
          <div className="h-4 w-6 rounded bg-gray-200"></div>
        </div>
      </div>
      <div className="flex w-max items-center gap-2">
        <div className="size-5 rounded-full bg-gray-200"></div>
        <div className="h-4 w-16 rounded bg-gray-200"></div>
      </div>
    </div>

    <div className="flex items-center gap-2 md:col-span-3 lg:col-span-4">
      <div className="size-12 rounded bg-gray-200"></div>
      <div className="h-12 w-16 rounded bg-gray-200"></div>
      <div className="size-12 rounded bg-gray-200"></div>
    </div>

    <div className="flex items-center justify-end md:col-span-2 lg:col-span-2">
      <div className="h-6 w-20 rounded bg-gray-200"></div>
    </div>
  </div>
);

export default ShoppingCartItemSkeleton;
