import baseCskComponentsMapping from '@uniformdev/csk-components/components/canvas';
import DemoHero from './DemoHero';
import Header from './Header';
import NavigationFlyout from './NavigationFlyout';

export const cskComponentsMapping = {
  ...baseCskComponentsMapping,
  navigationFlyout: { component: NavigationFlyout },
  header: { component: Header },
  flexibleHero: { component: DemoHero.FlexibleHero },
  fixedHero: { component: DemoHero.FixedHero },
};
