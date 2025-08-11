import { cskComponentsNames } from '@/constants';
import createEmptyPlaceholderResolver, { EmptyPlaceholderMapping } from '@/utils/createEmptyPlaceholderResolver';

// Empty Placeholders
import { accordionEmptyPlaceholderWrapper } from './Accordion';
import { carouselEmptyPlaceholderWrapper } from './Carousel';
import { flexibleHeroEmptyPlaceholderWrapper } from './DemoHero';
import { footerEmptyPlaceholderWrapper } from './Footer';
import { modalEmptyPlaceholderWrapper } from './Modal';
import { pageEmptyPlaceholderWrapper } from './Page/empty-placeholder';

const cskEmptyPlaceholderMapping: EmptyPlaceholderMapping = {
  [cskComponentsNames.Page]: pageEmptyPlaceholderWrapper,
  [cskComponentsNames.FlexibleHero]: flexibleHeroEmptyPlaceholderWrapper,
  [cskComponentsNames.Accordion]: accordionEmptyPlaceholderWrapper,
  [cskComponentsNames.Carousel]: carouselEmptyPlaceholderWrapper,
  [cskComponentsNames.Footer]: footerEmptyPlaceholderWrapper,
  [cskComponentsNames.Modal]: modalEmptyPlaceholderWrapper,
};

export default cskEmptyPlaceholderMapping;
export const emptyPlaceholderResolver = createEmptyPlaceholderResolver(cskEmptyPlaceholderMapping);
