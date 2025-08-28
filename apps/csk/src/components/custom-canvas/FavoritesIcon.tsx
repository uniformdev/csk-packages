import { FC } from 'react';
import { AssetParamValue } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-react';
import { NavigationLink as CSKNavigationLink } from '@uniformdev/csk-components/components/canvas';
import { NavigationLinkParameters as CSKNavigationLinkParameters } from '@uniformdev/csk-components/components/canvas';
import FavoritesIconUI from '@/components/custom-ui/FavoritesIcon';

type FavoritesIconParameters = Omit<CSKNavigationLinkParameters, 'icon'> & {
  filledFavoritesIcon?: AssetParamValue;
  emptyFavoritesIcon?: AssetParamValue;
};

type FavoritesIconProps = ComponentProps<FavoritesIconParameters>;

const FavoritesIcon: FC<FavoritesIconProps> = props => {
  const { filledFavoritesIcon, emptyFavoritesIcon } = props;

  return (
    <FavoritesIconUI
      {...props}
      filledFavoritesIcon={<CSKNavigationLink className="text-red-500" icon={filledFavoritesIcon} {...props} />}
      emptyFavoritesIcon={<CSKNavigationLink icon={emptyFavoritesIcon} {...props} />}
    />
  );
};

export default FavoritesIcon;
