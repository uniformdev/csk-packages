import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-react';
import BaseDynamicProductRecommendations, {
  DynamicRecommendationsProps as BaseDynamicRecommendationsParameters,
} from '@/components/custom-ui/DynamicProductRecommendations';

enum DynamicRecommendationsSlots {
  DynamicRecommendationsTitle = 'dynamicRecommendationsTitle',
}

type DynamicRecommendationsProps = ComponentProps<BaseDynamicRecommendationsParameters>;

const DynamicProductRecommendations: FC<DynamicRecommendationsProps & BaseDynamicRecommendationsParameters> = ({
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
    title={<UniformSlot name={DynamicRecommendationsSlots.DynamicRecommendationsTitle} />}
  />
);

export default DynamicProductRecommendations;
