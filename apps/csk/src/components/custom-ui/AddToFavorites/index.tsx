import { ContainerProps as CSKContainerProps } from '@uniformdev/csk-components/components/canvas';

export type AddToFavoritesProps = {
  addIcon: string;
  removeIcon: string;
  productSlug: string;
  position?: 'top-right' | 'bottom';
  backgroundColor?: CSKContainerProps['backgroundColor'];
  spacing?: CSKContainerProps['spacing'];
  size?: string;
};

export { AddToFavorites as default } from './AddToFavorites';
export { AddToFavoritesSkeleton } from './skeleton';
