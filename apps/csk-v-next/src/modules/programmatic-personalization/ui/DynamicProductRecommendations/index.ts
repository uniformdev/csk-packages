import { ReactElement } from 'react';
import { ContainerProps as CSKContainerProps } from '@uniformdev/csk-components/components/ui';
import { ProductBoostEnrichment } from '../../types';

export type DynamicRecommendationsProps = Omit<CSKContainerProps, 'title'> & {
  loadingIndicatorColor?: string;
  boostEnrichment: ProductBoostEnrichment;
  title: ReactElement;
};

export { default as DynamicProductRecommendations } from './DynamicProductRecommendations';
