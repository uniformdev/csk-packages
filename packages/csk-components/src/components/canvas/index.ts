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
  [cskComponentsNames.Accordion]: Accordion,
  [cskComponentsNames.AccordionItem]: AccordionItem,
  [cskComponentsNames.Badge]: Badge,
  [cskComponentsNames.Banner]: Banner,
  [cskComponentsNames.Button]: Button,
  [cskComponentsNames.Card]: Card,
  [cskComponentsNames.Carousel]: Carousel,
  [cskComponentsNames.Container]: Container,
  [cskComponentsNames.Countdown]: Countdown,
  [cskComponentsNames.Divider]: Divider,
  [cskComponentsNames.Grid]: Grid,
  [cskComponentsNames.GridItem]: GridItem,
  [cskComponentsNames.Flex]: Flex,
  [cskComponentsNames.FlexItem]: FlexItem,
  [cskComponentsNames.Header]: Header,
  [cskComponentsNames.Section]: Section,
  [cskComponentsNames.IconLabel]: IconLabel,
  [cskComponentsNames.Image]: Image,
  [cskComponentsNames.Page]: Page,
  [cskComponentsNames.RichText]: RichText,
  [cskComponentsNames.Spacer]: Spacer,
  [cskComponentsNames.Text]: Text,
  [cskComponentsNames.Video]: Video,
  [cskComponentsNames.Tabs]: Tabs,
  [cskComponentsNames.Tab]: Tab,
  [cskComponentsNames.Table]: Table,
  [cskComponentsNames.TableRow]: TableRow,
  [cskComponentsNames.TableHeaderCell]: TableHeaderCell,
  [cskComponentsNames.TableDataCell]: TableDataCell,
  [cskComponentsNames.TableCustomCell]: TableCustomCell,
  [cskComponentsNames.Modal]: Modal,
  [cskComponentsNames.ImageGallery]: ImageGallery,
  [cskComponentsNames.Testimonial]: Testimonial,
  [cskComponentsNames.Breadcrumbs]: Breadcrumbs,
  [cskComponentsNames.Review]: Review,
  [cskComponentsNames.NavigationLink]: NavigationLink,
  [cskComponentsNames.NavigationGroup]: NavigationGroup,
  [cskComponentsNames.NavigationFlyout]: NavigationFlyout,
  [cskComponentsNames.Footer]: Footer,
  [cskComponentsNames.ThemeSwitcher]: ThemeSwitcher,
  [cskComponentsNames.Link]: Link,
  [cskComponentsNames.FixedHero]: DemoHero.FixedHero,
  [cskComponentsNames.FlexibleHero]: DemoHero.FlexibleHero,
};

export default cskComponentsMapping;
export const componentResolver = createComponentResolver(cskComponentsMapping);
