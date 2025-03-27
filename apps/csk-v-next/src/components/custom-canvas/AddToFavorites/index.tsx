import { FC } from 'react';
import { DefaultTheme } from 'tailwindcss/types/generated/default-theme';
import { Asset } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerProps } from '@uniformdev/csk-components/components/ui';
import AddToFavoritesClient from './add-to-favorites-client';

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
