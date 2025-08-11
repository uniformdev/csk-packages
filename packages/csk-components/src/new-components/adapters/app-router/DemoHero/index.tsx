import { FixedHeroParameters, FlexibleHeroParameters, FlexibleHeroSlots } from '@/new-components/canvas/DemoHero';
import { ComponentProps } from '@/types/canvasTypes';
import FixedHero from './fixed-hero';
import FlexibleHero from './flexible-hero';

export type FixedHeroProps = ComponentProps<FixedHeroParameters>;
export type FlexibleHeroProps = ComponentProps<FlexibleHeroParameters, FlexibleHeroSlots>;

const DemoHero = { FixedHero, FlexibleHero };
export default DemoHero;
export { flexibleHeroEmptyPlaceholderWrapper } from './empty-placeholder';
