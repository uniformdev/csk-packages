'use client';

import { FC, ReactNode } from 'react';
import dynamic from 'next/dynamic';

import { NavigationLinkParameters as CSKNavigationLinkParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import { FavoritesIconSkeleton } from './skeleton';

const FavoritesIconClient = dynamic(() => import('./FavoritesIcon').then(mod => mod.default), {
  ssr: false,
  loading: () => <FavoritesIconSkeleton />,
});

export type FavoritesIconProps = Omit<CSKNavigationLinkParameters, 'icon'> & {
  filledFavoritesIcon?: ReactNode;
  emptyFavoritesIcon?: ReactNode;
};

const FavoritesIcon: FC<FavoritesIconProps> = props => <FavoritesIconClient {...props} />;

export default FavoritesIcon;
