import { FC } from 'react';
import { DemoHeroProps } from '.';
import { DemoHero } from './demo-hero';

export const FlexibleHero: FC<DemoHeroProps> = props => <DemoHero {...props} isFlexibleHero={true} />;
