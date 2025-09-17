import { FC } from 'react';
import { NavigationLink as CSKNavigationLink } from '@uniformdev/csk-components/components/canvas/serverClient';
import { ComponentProps, ReplaceFieldsWithAssets } from '@uniformdev/csk-components/types/cskTypes';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import FavoritesIconClient, { FavoritesIconProps as FavoritesIconClientParameters } from './FavoritesIconClient';

type FavoritesIconProps = ComponentProps<FavoritesIconClientParameters>;

const FavoritesIcon: FC<
  FavoritesIconProps &
    ReplaceFieldsWithAssets<FavoritesIconClientParameters, 'filledFavoritesIcon' | 'emptyFavoritesIcon'>
> = props => {
  const { filledFavoritesIcon, emptyFavoritesIcon } = props;

  return (
    <FavoritesIconClient
      {...props}
      filledFavoritesIcon={<CSKNavigationLink className="text-red-500" icon={filledFavoritesIcon} {...props} />}
      emptyFavoritesIcon={<CSKNavigationLink icon={emptyFavoritesIcon} {...props} />}
    />
  );
};

export default withFlattenParameters(FavoritesIcon);
