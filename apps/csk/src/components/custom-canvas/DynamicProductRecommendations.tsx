import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import {
  DynamicProductRecommendations as BaseDynamicProductRecommendations,
  DynamicRecommendationsProps as BaseDynamicRecommendationsParameters,
} from '@/components/custom-ui/DynamicProductRecommendations';

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
);

export default withFlattenParameters(DynamicProductRecommendations);
