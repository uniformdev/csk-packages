import { ComponentProps } from '@uniformdev/canvas-react';
import { FixedHeroParameters, FlexibleHeroParameters } from '@/new-components/canvas/DemoHero';
import { FixedHero } from './fixed-hero';
import { FlexibleHero } from './flexible-hero';

export type FixedHeroProps = ComponentProps<FixedHeroParameters>;
export type FlexibleHeroProps = ComponentProps<FlexibleHeroParameters>;

const DemoHero = { FixedHero, FlexibleHero };
export default DemoHero;
