import { FC } from 'react';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { FlexibleHeroParameters, FlexibleHeroProps } from '.';
import { DemoHero } from './demo-hero';

export const FlexibleHero: FC<
  FlexibleHeroProps & ReplaceFieldsWithAssets<FlexibleHeroParameters, 'image' | 'primaryButtonIcon'>
> = props => <DemoHero {...props} isFlexibleHero={true} />;

export default withFlattenParameters(FlexibleHero);
