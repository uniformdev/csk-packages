import { ContainerParameters as CSKContainerParameters } from '@uniformdev/csk-components/components/canvas/serverClient';

export type AddToFavoritesProps = {
  addIcon?: string;
  removeIcon?: string;
  productSlug?: string;
  position?: 'top-right' | 'bottom';
  backgroundColor?: CSKContainerParameters['backgroundColor'];
  spacing?: CSKContainerParameters['spacing'];
  size?: string;
};

export { AddToFavorites as default } from './AddToFavorites';
export { AddToFavoritesSkeleton } from './skeleton';
