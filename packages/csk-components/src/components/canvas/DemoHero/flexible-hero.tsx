import { FC } from 'react';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { FlexibleHeroParameters, FlexibleHeroProps } from '.';
import { DemoHero } from './demo-hero';

export const FlexibleHero: FC<FlexibleHeroProps & FlexibleHeroParameters> = props => (
  <DemoHero {...props} isFlexibleHero={true} />
);

export default withFlattenParameters(FlexibleHero);
