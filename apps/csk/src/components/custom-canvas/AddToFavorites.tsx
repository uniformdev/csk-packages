import { FC } from 'react';
import { AssetParamValue } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-react';
import { ContainerParameters as CSKContainerParameters } from '@uniformdev/csk-components/components/canvas';
import { resolveAsset } from '@uniformdev/csk-components/utils/assets';
import AddToFavoritesClient from '../custom-ui/AddToFavorites';

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

const AddToFavorites: FC<AddToFavoritesProps> = props => {
  const { addIcon, removeIcon } = props;

  const [resolvedAddIcon] = resolveAsset(addIcon);
  const [resolvedRemoveIcon] = resolveAsset(removeIcon);

  return <AddToFavoritesClient {...props} addIcon={resolvedAddIcon?.url} removeIcon={resolvedRemoveIcon?.url} />;
};

export default AddToFavorites;
