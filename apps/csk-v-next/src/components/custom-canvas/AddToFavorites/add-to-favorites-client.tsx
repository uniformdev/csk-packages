'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
import { Asset } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerProps } from '@uniformdev/csk-components/components/ui';
import { ShoppingCartSkeleton } from '@/modules/cart';

const AddToFavoritesClient = dynamic(() => import('./add-to-favorites').then(mod => mod.default), {
  ssr: false,
  loading: () => <ShoppingCartSkeleton />,
});

type IconSize = keyof DefaultTheme['fontSize'];

export type AddToFavoritesParameters = {
  addIcon?: Asset[];
  removeIcon?: Asset[];
  size?: IconSize;
  position: 'block' | 'top-right';
  spacing?: ContainerProps['spacing'];
  backgroundColor?: ContainerProps['backgroundColor'];
};
enum SectionSlots {
  Content = 'content',
}

type AddToFavoritesProps = ComponentProps<AddToFavoritesParameters, SectionSlots>;

const AddToFavorites: FC<AddToFavoritesProps> = props => <AddToFavoritesClient {...props} />;

export default AddToFavorites;
