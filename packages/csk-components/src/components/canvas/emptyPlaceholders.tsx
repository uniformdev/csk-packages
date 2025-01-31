import createEmptyPlaceholderResolver, {
  EmptyPlaceholderMapping,
} from '@uniformdev/csk-components/utils/createEmptyPlaceholderResolver';

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
  accordion: AccordionEmptyPlaceholder,
  banner: BannerEmptyPlaceholder,
  card: CardEmptyPlaceholder,
  carousel: CarouselEmptyPlaceholder,
  countdown: CountdownEmptyPlaceholder,
  flexibleHero: FlexibleHeroEmptyPlaceholder,
  footer: FooterEmptyPlaceholder,
  header: HeaderEmptyPlaceholder,
  imageGallery: ImageGalleryEmptyPlaceholder,
  modal: ModalEmptyPlaceholder,
  navigationFlyout: NavigationFlyoutEmptyPlaceholder,
  navigationGroup: NavigationGroupEmptyPlaceholder,
  page: PageEmptyPlaceholder,
  review: ReviewEmptyPlaceholder,
  section: SectionEmptyPlaceholder,
  table: TableEmptyPlaceholder,
  tabs: TabsEmptyPlaceholder,
  testimonial: TestimonialEmptyPlaceholder,
};

export default cskEmptyPlaceholderMapping;
export const emptyPlaceholderResolver = createEmptyPlaceholderResolver(cskEmptyPlaceholderMapping);
