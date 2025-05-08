import { ReactNode } from 'react';
import { Asset } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters } from '@/components/canvas/Text/parameters';
import { withPlaygroundWrapper } from '@/hocs/withPlaygroundWrapper';
export * from './navigation-mega-menu-section';
import { NavigationMegaMenuSection } from './navigation-mega-menu-section';

type MegaMenuLink = {
  _id: string;
  type: 'megaMenuLink';
  fields: {
    icon?: { type: 'asset'; value: Asset[] };
    hoverIcon?: { type: 'asset'; value: Asset[] };
    title: { type: 'text'; value: string };
    link?: { type: 'link'; value: { path: string; type: 'url' } };
    children?: { type: '$block'; value: MegaMenuLink[] };
  };
};

type FlattenedAsset = {
  id: string;
  url: string;
  file: string;
  size: number;
  title: string;
  width: number;
  height: number;
  mediaType: string;
};

type FlattenedLink = {
  path: string;
  type: 'url';
};

export type FlattenedMegaMenuLink = {
  icon?: FlattenedAsset[];
  hoverIcon?: FlattenedAsset[];
  title: string;
  link?: FlattenedLink;
  children?: FlattenedMegaMenuLink[];
  sectionTitle?: string;
};

export type NavigationMegaMenuSectionParameters = TextParameters & {
  icon?: Asset[];
  hoverIcon?: Asset[];
  link?: LinkParamValue;
  activeState?: boolean;
  hoverColor?: string;
  items?: MegaMenuLink[];
  rightContent?: ReactNode;
};

export type NavigationMegaMenuSectionProps = ComponentProps<NavigationMegaMenuSectionParameters>;

export default withPlaygroundWrapper(NavigationMegaMenuSection);
