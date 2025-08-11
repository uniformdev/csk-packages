import { cskComponentsNames } from '@/constants';
import createComponentResolver, { ComponentMapping } from '@/utils/createAppRouterComponentResolver';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import Button from './Button';
import Carousel from './Carousel';
import Container from './Container';
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
import Link from './Link';
import Modal from './Modal';
import NavigationLink from './NavigationLink';
import Page from './Page';
import RichText from './RichText';
import Spacer from './Spacer';
import Text from './Text';
import Video from './Video';

export const cskComponentsMapping: ComponentMapping = {
  [cskComponentsNames.Page]: Page,
  [cskComponentsNames.FixedHero]: DemoHero.FixedHero,
  [cskComponentsNames.FlexibleHero]: DemoHero.FlexibleHero,
  [cskComponentsNames.Text]: Text,
  [cskComponentsNames.RichText]: RichText,
  [cskComponentsNames.Spacer]: Spacer,
  [cskComponentsNames.Container]: Container,
  [cskComponentsNames.Accordion]: Accordion,
  [cskComponentsNames.AccordionItem]: AccordionItem,
  [cskComponentsNames.Header]: Header,
  [cskComponentsNames.Button]: Button,
  [cskComponentsNames.Carousel]: Carousel,
  [cskComponentsNames.Flex]: Flex,
  [cskComponentsNames.FlexItem]: FlexItem,
  [cskComponentsNames.Footer]: Footer,
  [cskComponentsNames.Grid]: Grid,
  [cskComponentsNames.GridItem]: GridItem,
  [cskComponentsNames.Divider]: Divider,
  [cskComponentsNames.IconLabel]: IconLabel,
  [cskComponentsNames.Image]: Image,
  [cskComponentsNames.Link]: Link,
  [cskComponentsNames.Modal]: Modal,
  [cskComponentsNames.Video]: Video,
  [cskComponentsNames.NavigationLink]: NavigationLink,
};

export default cskComponentsMapping;
export const componentResolver = createComponentResolver(cskComponentsMapping);
