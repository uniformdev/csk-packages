import { ComponentMapping } from '@/utils/createComponentResolver';
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
  accordion: { component: Accordion },
  accordionItem: { component: AccordionItem },
  badge: { component: Badge },
  banner: { component: Banner },
  button: { component: Button },
  card: { component: Card },
  carousel: { component: Carousel },
  container: { component: Container },
  countdown: { component: Countdown },
  divider: { component: Divider },
  grid: { component: Grid },
  gridItem: { component: GridItem },
  flex: { component: Flex },
  flexItem: { component: FlexItem },
  header: { component: Header },
  section: { component: Section },
  iconLabel: { component: IconLabel },
  image: { component: Image },
  page: { component: Page },
  richText: { component: RichText },
  spacer: { component: Spacer },
  text: { component: Text },
  video: { component: Video },
  tabs: { component: Tabs },
  tab: { component: Tab },
  table: { component: Table },
  tableRow: { component: TableRow },
  tableHeaderCell: { component: TableHeaderCell },
  tableDataCell: { component: TableDataCell },
  tableCustomCell: { component: TableCustomCell },
  modal: { component: Modal },
  imageGallery: { component: ImageGallery },
  testimonial: { component: Testimonial },
  breadcrumbs: { component: Breadcrumbs },
  review: { component: Review },
  navigationLink: { component: NavigationLink },
  navigationGroup: { component: NavigationGroup },
  navigationFlyout: { component: NavigationFlyout },
  footer: { component: Footer },
  themeSwitcher: { component: ThemeSwitcher },
  link: { component: Link },
  fixedHero: { component: DemoHero.FixedHero },
  flexibleHero: { component: DemoHero.FlexibleHero },
};

export {
  Accordion,
  AccordionItem,
  Badge,
  Banner,
  Button,
  Card,
  Carousel,
  Container,
  Countdown,
  Divider,
  Grid,
  GridItem,
  Flex,
  FlexItem,
  Header,
  Section,
  IconLabel,
  Image,
  Page,
  RichText,
  Spacer,
  Text,
  Video,
  Tabs,
  Tab,
  Table,
  TableRow,
  TableHeaderCell,
  TableDataCell,
  TableCustomCell,
  Modal,
  ImageGallery,
  Testimonial,
  Breadcrumbs,
  Review,
  NavigationLink,
  NavigationGroup,
  NavigationFlyout,
  Footer,
  ThemeSwitcher,
  Link,
  DemoHero,
};
