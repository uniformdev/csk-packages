import { cskComponentsNames } from '@/constants';
import createEmptyPlaceholderResolver, { EmptyPlaceholderMapping } from '@/utils/createEmptyPlaceholderResolver';

// Empty Placeholders
import { AccordionEmptyPlaceholder } from './Accordion/empty-placeholder';
import { BannerEmptyPlaceholder } from './Banner/empty-placeholder';
import { CardEmptyPlaceholder } from './Card/empty-placeholder';
import { CarouselEmptyPlaceholder } from './Carousel/empty-placeholder';
import { CountdownEmptyPlaceholder } from './Countdown/empty-placeholder';
import { FlexibleHeroEmptyPlaceholder } from './DemoHero/empty-placeholder';
import { FooterEmptyPlaceholder } from './Footer/empty-placeholder';
import { HeaderEmptyPlaceholder } from './Header/empty-placeholder';
import { ImageGalleryEmptyPlaceholder } from './ImageGallery/empty-placeholder';
import { ModalEmptyPlaceholder } from './Modal/empty-placeholder';
import { NavigationFlyoutEmptyPlaceholder } from './NavigationFlyout/empty-placeholder';
import { NavigationGroupEmptyPlaceholder } from './NavigationGroup/empty-placeholder';
import { PageEmptyPlaceholder } from './Page/empty-placeholder';
import { ReviewEmptyPlaceholder } from './Review/empty-placeholder';
import { SectionEmptyPlaceholder } from './Section/empty-placeholder';
import { TableEmptyPlaceholder } from './Table/empty-placeholder';
import { TabsEmptyPlaceholder } from './Tabs/empty-placeholder';
import { TestimonialEmptyPlaceholder } from './Testimonial/empty-placeholder';

const cskEmptyPlaceholderMapping: EmptyPlaceholderMapping = {
  [cskComponentsNames.Accordion]: AccordionEmptyPlaceholder,
  [cskComponentsNames.Banner]: BannerEmptyPlaceholder,
  [cskComponentsNames.Card]: CardEmptyPlaceholder,
  [cskComponentsNames.Carousel]: CarouselEmptyPlaceholder,
  [cskComponentsNames.Countdown]: CountdownEmptyPlaceholder,
  [cskComponentsNames.FlexibleHero]: FlexibleHeroEmptyPlaceholder,
  [cskComponentsNames.Footer]: FooterEmptyPlaceholder,
  [cskComponentsNames.Header]: HeaderEmptyPlaceholder,
  [cskComponentsNames.ImageGallery]: ImageGalleryEmptyPlaceholder,
  [cskComponentsNames.Modal]: ModalEmptyPlaceholder,
  [cskComponentsNames.NavigationFlyout]: NavigationFlyoutEmptyPlaceholder,
  [cskComponentsNames.NavigationGroup]: NavigationGroupEmptyPlaceholder,
  [cskComponentsNames.Page]: PageEmptyPlaceholder,
  [cskComponentsNames.Review]: ReviewEmptyPlaceholder,
  [cskComponentsNames.Section]: SectionEmptyPlaceholder,
  [cskComponentsNames.Table]: TableEmptyPlaceholder,
  [cskComponentsNames.Tabs]: TabsEmptyPlaceholder,
  [cskComponentsNames.Testimonial]: TestimonialEmptyPlaceholder,
};

export default cskEmptyPlaceholderMapping;
export const emptyPlaceholderResolver = createEmptyPlaceholderResolver(cskEmptyPlaceholderMapping);
