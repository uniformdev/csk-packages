import { FC, Suspense } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import {
  DynamicProductRecommendations as BaseDynamicProductRecommendations,
  DynamicRecommendationsProps as BaseDynamicRecommendationsParameters,
} from '@/components/custom-ui/DynamicProductRecommendations';

const CardSkeleton: FC = () => (
  <div className="h-full">
    <div className="relative h-full overflow-hidden">
      <div className="relative border border-gray-300 bg-white p-4">
        <div className="relative aspect-square w-full overflow-hidden bg-[#e7e7e7] animate-pulse" />
      </div>
      <div className="relative mt-4 flex flex-col gap-y-2 min-h-[140px] md:min-h-[156px] lg:min-h-[172px]">
        <div className="px-0">
          <div className="flex flex-col gap-2">
            <div className="h-7 w-full rounded-md bg-gray-200 animate-pulse" />
            <div className="h-5 w-2/5 rounded-md bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const OffersGridPlaceholder: FC<{
  items?: number;
  className?: string;
  gapClass?: string;
}> = ({ items = 3, className = '', gapClass = '' }) => (
  <section
    aria-label="Special offers loading"
    className={cn('px-4 xl:px-0 mx-auto w-full max-w-7xl max-w-container-width', className)}
  >
    <div className="pt-container-medium pb-container-medium">
      <div className="flex flex-col justify-center gap-16 items-center">
        <div className="h-10 w-80 md:w-96 rounded-md bg-gray-200 animate-pulse" aria-hidden />
        <div className="w-full">
          <div className={cn('grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-8', gapClass)}>
            {Array.from({ length: items }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

enum DynamicRecommendationsSlots {
  DynamicRecommendationsTitle = 'dynamicRecommendationsTitle',
}

type DynamicRecommendationsProps = ComponentProps<BaseDynamicRecommendationsParameters, DynamicRecommendationsSlots>;

const DynamicProductRecommendations: FC<DynamicRecommendationsProps & BaseDynamicRecommendationsParameters> = ({
  slots,
  backgroundColor,
  spacing,
  fluidContent,
  height,
  border,
  loadingIndicatorColor,
  boostEnrichments,
  maxRecommendations,
}) => (
  <Suspense
    fallback={
      <OffersGridPlaceholder items={maxRecommendations ? parseInt(maxRecommendations) : 3} gapClass="gap-x-8 gap-y-8" />
    }
  >
    <BaseDynamicProductRecommendations
      {...{
        backgroundColor,
        spacing,
        border,
        fluidContent,
        height,
        boostEnrichments,
        loadingIndicatorColor,
        maxRecommendations,
      }}
      title={<UniformSlot slot={slots.dynamicRecommendationsTitle} />}
    />
  </Suspense>
);

export default withFlattenParameters(DynamicProductRecommendations);
