import { cskComponentsNames } from '@/constants';
import createComponentResolver, { ComponentMapping } from '@/utils/createComponentResolver';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import Badge from './Badge';
import Banner from './Banner';
import Breadcrumbs from './Breadcrumbs';
import Button from './Button';
import Card from './Card';
import Carousel from './Carousel';
import Container from './Container';
import Countdown from './Countdown';
import DemoHero from './DemoHero';
import Divider from './Divider';
import Flex from './Flex';
import FlexItem from './FlexItem';
import Footer from './Footer';
import Grid from './Grid';
import GridItem from './GridItem';
import Header from './Header';
import IconLabel from './IconLabel';
import Image from './Image';
import ImageGallery from './ImageGallery';
import Link from './Link';
import Modal from './Modal';
import NavigationFlyout from './NavigationFlyout';
import NavigationGroup from './NavigationGroup';
import NavigationLink from './NavigationLink';
import Page from './Page';
import Review from './Review';
import RichText from './RichText';
import Section from './Section';
import Spacer from './Spacer';
import Tab from './Tab';
import Table from './Table';
import TableCustomCell from './TableCustomCell';
import TableDataCell from './TableDataCell';
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';
import Tabs from './Tabs';
import Testimonial from './Testimonial';
import Text from './Text';
import ThemeSwitcher from './ThemeSwitcher';
import Video from './Video';

export const cskComponentsMapping: ComponentMapping = {
  [cskComponentsNames.Accordion]: { component: Accordion },
  [cskComponentsNames.AccordionItem]: { component: AccordionItem },
  [cskComponentsNames.Badge]: { component: Badge },
  [cskComponentsNames.Banner]: { component: Banner },
  [cskComponentsNames.Button]: { component: Button },
  [cskComponentsNames.Card]: { component: Card },
  [cskComponentsNames.Carousel]: { component: Carousel },
  [cskComponentsNames.Container]: { component: Container },
  [cskComponentsNames.Countdown]: { component: Countdown },
  [cskComponentsNames.Divider]: { component: Divider },
  [cskComponentsNames.Grid]: { component: Grid },
  [cskComponentsNames.GridItem]: { component: GridItem },
  [cskComponentsNames.Flex]: { component: Flex },
  [cskComponentsNames.FlexItem]: { component: FlexItem },
  [cskComponentsNames.Header]: { component: Header },
  [cskComponentsNames.Section]: { component: Section },
  [cskComponentsNames.IconLabel]: { component: IconLabel },
  [cskComponentsNames.Image]: { component: Image },
  [cskComponentsNames.Page]: { component: Page },
  [cskComponentsNames.RichText]: { component: RichText },
  [cskComponentsNames.Spacer]: { component: Spacer },
  [cskComponentsNames.Text]: { component: Text },
  [cskComponentsNames.Video]: { component: Video },
  [cskComponentsNames.Tabs]: { component: Tabs },
  [cskComponentsNames.Tab]: { component: Tab },
  [cskComponentsNames.Table]: { component: Table },
  [cskComponentsNames.TableRow]: { component: TableRow },
  [cskComponentsNames.TableHeaderCell]: { component: TableHeaderCell },
  [cskComponentsNames.TableDataCell]: { component: TableDataCell },
  [cskComponentsNames.TableCustomCell]: { component: TableCustomCell },
  [cskComponentsNames.Modal]: { component: Modal },
  [cskComponentsNames.ImageGallery]: { component: ImageGallery },
  [cskComponentsNames.Testimonial]: { component: Testimonial },
  [cskComponentsNames.Breadcrumbs]: { component: Breadcrumbs },
  [cskComponentsNames.Review]: { component: Review },
  [cskComponentsNames.NavigationLink]: { component: NavigationLink },
  [cskComponentsNames.NavigationGroup]: { component: NavigationGroup },
  [cskComponentsNames.NavigationFlyout]: { component: NavigationFlyout },
  [cskComponentsNames.Footer]: { component: Footer },
  [cskComponentsNames.ThemeSwitcher]: { component: ThemeSwitcher },
  [cskComponentsNames.Link]: { component: Link },
  [cskComponentsNames.FixedHero]: { component: DemoHero.FixedHero },
  [cskComponentsNames.FlexibleHero]: { component: DemoHero.FlexibleHero },
};

export default cskComponentsMapping;
export const componentResolver = createComponentResolver(cskComponentsMapping);

// Component - Properties(Parameters) - Slots - Variants
export { default as Accordion, type AccordionProps, type AccordionParameters, AccordionSlots } from './Accordion';
export {
  default as AccordionItem,
  type AccordionItemProps,
  type AccordionItemParameters,
  AccordionItemSlots,
} from './AccordionItem';
export { default as Badge, type BadgeProps, type BadgeParameters } from './Badge';
export {
  default as Banner,
  type BannerProps,
  type BannerParameters,
  BannerSlots,
  ContentAlignment as BannerContentAlignment,
} from './Banner';
export { default as Breadcrumbs, type BreadcrumbsProps, type BreadcrumbsParameters } from './Breadcrumbs';
export { default as Button, type ButtonProps, type ButtonParameters } from './Button';
export { default as Card, type CardProps, type CardParameters, CardSlots, CardVariants } from './Card';
export { default as Carousel, type CarouselProps, type CarouselParameters, CarouselSlots } from './Carousel';
export { default as Container, type ContainerProps, type ContainerParameters, ContainerSlots } from './Container';
export {
  default as Countdown,
  type CountdownProps,
  type CountdownParameters,
  CountdownSlots,
  CountdownVariants,
} from './Countdown';
export {
  default as DemoHero,
  type DemoHeroProps,
  type FixedHeroProps,
  type FlexibleHeroProps,
  type DemoHeroParameters,
  type FixedHeroParameters,
  type FlexibleHeroParameters,
  FlexibleHeroSlots,
  DemoHeroVariants,
  ContentAlignment as DemoHeroContentAlignment,
} from './DemoHero';
export { default as Divider, type DividerProps, type DividerParameters } from './Divider';
export { default as Flex, type FlexProps, type FlexParameters } from './Flex';
export { default as FlexItem, type FlexItemProps, type FlexItemParameters } from './FlexItem';
export { default as Footer, type FooterProps, type FooterParameters, FooterSlots } from './Footer';
export { default as Grid, type GridProps, type GridParameters, GridSlots } from './Grid';
export { default as GridItem, type GridItemProps, type GridItemParameters, GridItemSlots } from './GridItem';
export { default as Header, type HeaderProps, type HeaderParameters, HeaderSlots, HeaderVariants } from './Header';
export { default as IconLabel, type IconLabelProps, type IconLabelParameters } from './IconLabel';
export { default as Image, type ImageProps, type ImageParameters } from './Image';
export {
  default as ImageGallery,
  type ImageGalleryProps,
  type ImageGalleryParameters,
  ImageGallerySlots,
} from './ImageGallery';
export { default as Link, type LinkProps, type LinkParameters, LinkSlots } from './Link';
export { default as Modal, type ModalProps, type ModalParameters, ModalSlots } from './Modal';
export {
  default as NavigationFlyout,
  type NavigationFlyoutProps,
  type NavigationFlyoutParameters,
} from './NavigationFlyout';
export {
  default as NavigationGroup,
  type NavigationGroupProps,
  type NavigationGroupParameters,
} from './NavigationGroup';
export { default as NavigationLink, type NavigationLinkProps, type NavigationLinkParameters } from './NavigationLink';
export { default as Page, type PageProps, type PageParameters, CommonPageSlots } from './Page';
export { default as Review, type ReviewProps, type ReviewParameters, ReviewSlots, ReviewVariants } from './Review';
export { default as RichText, type RichTextProps, type RichTextParameters } from './RichText';
export {
  default as Section,
  type SectionProps,
  type SectionParameters,
  SectionSlots,
  SectionVariants,
  ContentAlignment as SectionContentAlignment,
} from './Section';
export { default as Spacer, type SpacerProps, type SpacerParameters, SpacerVariants } from './Spacer';
export { default as Tab, type TabProps, type TabParameters, TabSlots } from './Tab';
export { default as Table, type TableProps, type TableParameters, TableSlots } from './Table';
export {
  default as TableCustomCell,
  type TableCustomCellProps,
  type TableCustomCellParameters,
  TableCustomCellSlots,
} from './TableCustomCell';
export { default as TableDataCell, type TableDataCellProps, type TableDataCellParameters } from './TableDataCell';
export {
  default as TableHeaderCell,
  type TableHeaderCellProps,
  type TableHeaderCellParameters,
} from './TableHeaderCell';
export { default as TableRow, type TableRowProps } from './TableRow';
export { default as Tabs, type TabsProps, type TabsParameters, TabsSlots, TabsVariants } from './Tabs';
export {
  default as Testimonial,
  type TestimonialProps,
  type TestimonialParameters,
  TestimonialSlots,
  TestimonialVariants,
} from './Testimonial';
export { default as Text, type TextProps, type TextParameters } from './Text';
export { default as ThemeSwitcher, type ThemeSwitcherProps, type ThemeSwitcherParameters } from './ThemeSwitcher';
export { default as Video, type VideoProps, type VideoParameters } from './Video';
