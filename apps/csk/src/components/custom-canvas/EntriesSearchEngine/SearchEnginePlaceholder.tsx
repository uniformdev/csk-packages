import { FC } from 'react';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';

type SearchEnginePlaceholderParameters = {
  cards?: number;
  withSidebar?: boolean;
};
type SearchEnginePlaceholderProps = ComponentProps<SearchEnginePlaceholderParameters>;

const Bar: FC<{ className?: string; light?: boolean; rounded?: boolean }> = ({
  className = '',
  light = false,
  rounded = true,
}) => <div className={cn('animate-pulse', { 'bg-gray-100': light, 'bg-gray-200': !light, rounded }, className)} />;

const InputStub: FC<{ className?: string }> = ({ className = '' }) => (
  <div className={cn('border border-gray-200 bg-gray-100 h-11 animate-pulse', className)} />
);

const Dot: FC<{ className?: string; light?: boolean }> = ({ className = '', light }) => (
  <div className={cn('rounded-full animate-pulse', { 'bg-gray-100': light, 'bg-gray-200': !light }, className)} />
);

const Square: FC<{ className?: string; bordered?: boolean; light?: boolean }> = ({
  className = '',
  bordered = true,
  light = false,
}) => (
  <div
    className={cn(
      'w-5 h-5',
      { 'border border-gray-300': bordered, 'bg-gray-100': light, 'bg-white': !light },
      className
    )}
  />
);

const SearchEnginePlaceholder: FC<SearchEnginePlaceholderProps & SearchEnginePlaceholderParameters> = ({
  cards = 0,
  withSidebar = false,
}) => (
  <div>
    <div className="px-4 xl:px-0 !px-0">
      <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 lg:gap-x-4 md:gap-x-4 gap-y-4 items-center">
        <div className="lg:col-span-3 md:col-span-3 h-full">
          <InputStub className="w-full" />
        </div>
        <div className="relative">
          <InputStub className="w-full pr-12" />
          <Dot className="size-4 absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>

    <div className="h-spacer-medium" />

    <div className="px-4 xl:px-0 !px-0">
      <div className="grid lg:grid-cols-4 md:grid-cols-1 grid-cols-1 lg:gap-x-8 md:gap-y-8 gap-y-8 items-stretch">
        {withSidebar ? (
          <aside className="hidden lg:block h-full">
            <div className="flex flex-col gap-y-10">
              {[...Array(2)].map((_, gi) => (
                <div key={`filters-${gi}`} className="flex flex-col gap-y-3">
                  <Bar className="h-5 w-40" />
                  <div className="flex flex-col gap-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-start gap-x-3">
                        <Square />
                        <Bar className="h-4 w-40" />
                        <Bar className="h-4 w-8 rounded-full ml-2" light />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-y-3">
                <Bar className="h-5 w-56" />
                <div>
                  <Bar className="h-1 w-full rounded" />
                  <div className="flex justify-between mt-3">
                    {[...Array(6)].map((_, i) => (
                      <Dot key={i} className="h-3 w-3" light />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        ) : (
          <div className="lg:hidden" />
        )}

        <main className="lg:col-start-2 lg:col-span-3 md:col-auto h-full">
          <div className="px-4 xl:px-0 !px-0">
            <div className="flex lg:flex-row md:flex-row flex-row lg:justify-between md:justify-between justify-between lg:gap-4 md:gap-4 gap-4 lg:items-center md:items-center items-center">
              <div className="shrink-0">
                <Bar className="h-4 w-40" />
              </div>
              <div>
                <div className="flex lg:flex-row md:flex-row flex-row lg:justify-end md:justify-end justify-between lg:gap-4 md:gap-4 gap-4 lg:items-center md:items-center items-center">
                  <Bar className="h-4 w-32" />
                  <div className="relative">
                    <InputStub className="min-w-[100px] pr-12" />
                    <Dot className="size-4 absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-spacer-small" />

          <div className="relative">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {Array.from({ length: cards }).map((_, idx) => (
                <div key={idx} className="px-4 xl:px-0 !px-0">
                  <div className="relative h-full overflow-hidden">
                    <div className="relative border border-gray-300 bg-white p-4">
                      <Bar className="relative aspect-square w-full" light rounded={false} />
                    </div>
                    <div className="relative mt-4 flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-2">
                        <Dot className="h-4 w-4" />
                        <Bar className="h-4 w-6" />
                      </div>
                      <div>
                        <div className="flex flex-col gap-2">
                          <Bar className="h-7 w-3/4" />
                          <Bar className="h-4 w-24" light />
                          <Bar className="h-5 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-spacer-small" />

          <nav
            className="mx-auto flex w-full items-center justify-between gap-x-7 sm:my-10 sm:w-max sm:justify-center"
            role="navigation"
            aria-label="Pagination"
          >
            <button className="text-lg hover:scale-125 transition-transform disabled:pointer-events-none sm:mx-1 block group opacity-60 pointer-events-none">
              <Dot className="h-6 w-6" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              {[...Array(3)].map((_, i) => (
                <Dot key={i} className="h-6 w-6" />
              ))}
            </div>
            <button className="text-lg hover:scale-125 transition-transform disabled:pointer-events-none sm:mx-1 block group opacity-60 pointer-events-none">
              <Dot className="h-6 w-6" />
            </button>
          </nav>
        </main>
      </div>
    </div>
  </div>
);

export default withFlattenParameters(SearchEnginePlaceholder);
