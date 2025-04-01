import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import {
  DynamicProductRecommendations as BaseDynamicProductRecommendations,
  DynamicRecommendationsProps as BaseDynamicRecommendationsProps,
} from '@/modules/programmatic-personalization';

enum DynamicRecommendationsSlots {
  DynamicRecommendationsTitle = 'dynamicRecommendationsTitle',
}

type DynamicRecommendationsProps = ComponentProps<BaseDynamicRecommendationsProps, DynamicRecommendationsSlots>;

const DynamicProductRecommendations: FC<DynamicRecommendationsProps> = ({
  component,
  context,
  slots,
  backgroundColor,
  spacing,
  fluidContent,
  fullHeight,
  border,
  loadingIndicatorColor,
  boostEnrichment,
}) => (
  <BaseDynamicProductRecommendations
    {...{ backgroundColor, spacing, border, fluidContent, fullHeight, boostEnrichment, loadingIndicatorColor }}
    title={<UniformSlot data={component} context={context} slot={slots.dynamicRecommendationsTitle} />}
  />
);

export default DynamicProductRecommendations;
