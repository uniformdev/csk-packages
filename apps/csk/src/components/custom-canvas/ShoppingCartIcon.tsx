'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { NavigationLinkProps as CSKNavigationLinkProps } from '@uniformdev/csk-components/components/canvas';
import { ShoppingCartIconSkeleton } from '@/components/custom-ui/ShoppingCartIcon';

const ShoppingCartIconClient = dynamic(
  () => import('@/components/custom-ui/ShoppingCartIcon').then(mod => mod.default),
  {
    ssr: false,
    loading: () => <ShoppingCartIconSkeleton />,
  }
);

type ShoppingCartIconProps = CSKNavigationLinkProps;

const ShoppingCartIcon: FC<ShoppingCartIconProps> = props => <ShoppingCartIconClient {...props} />;

export default ShoppingCartIcon;
