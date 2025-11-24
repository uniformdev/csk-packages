'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { AssetParamValue } from '@uniformdev/assets';
import { ContainerParameters as CSKContainerParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import { ComponentProps, ReplaceFieldsWithAssets } from '@uniformdev/csk-components/types/cskTypes';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import { AddToFavoritesSkeleton } from '../custom-ui/AddToFavorites';

const AddToFavoritesClient = dynamic(() => import('@/components/custom-ui/AddToFavorites').then(mod => mod.default), {
  ssr: false,
  loading: () => <AddToFavoritesSkeleton />,
});

type AddToFavoritesParameters = {
  addIcon?: AssetParamValue;
  removeIcon?: AssetParamValue;
  productSlug?: string;
  position?: 'top-right' | 'bottom';
  backgroundColor?: CSKContainerParameters['backgroundColor'];
  spacing?: CSKContainerParameters['spacing'];
  size?: string;
};

type AddToFavoritesProps = ComponentProps<AddToFavoritesParameters>;

const AddToFavorites: FC<
  AddToFavoritesProps & ReplaceFieldsWithAssets<AddToFavoritesParameters, 'addIcon' | 'removeIcon'>
> = props => {
  const { addIcon, removeIcon } = props;

  return <AddToFavoritesClient {...props} addIcon={addIcon?.[0]?.url} removeIcon={removeIcon?.[0]?.url} />;
};

export default withFlattenParameters(AddToFavorites);
