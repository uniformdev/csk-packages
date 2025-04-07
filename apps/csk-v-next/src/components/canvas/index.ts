import baseCskComponentsMapping, { Page } from '@uniformdev/csk-components/components/canvas';
import DemoHero from './DemoHero';
import Header from './Header';
import NavigationFlyout from './NavigationFlyout';
import Text from './Text';
import Video from './Video';

export const cskComponentsMapping = {
  ...baseCskComponentsMapping,
  navigationFlyout: { component: NavigationFlyout },
  header: { component: Header },
  flexibleHero: { component: DemoHero.FlexibleHero },
  fixedHero: { component: DemoHero.FixedHero },
  text: { component: Text },
  video: { component: Video },
  entryPreview: { component: Page },
};
