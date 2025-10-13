import { FC } from 'react';
import {
  NavigationLink as CSKNavigationLink,
  NavigationLinkProps as CSKNavigationLinkProps,
} from '@uniformdev/csk-components/components/canvas';
import ShoppingCartIconUI from '@/components/custom-ui/ShoppingCartIcon';

type ShoppingCartIconProps = CSKNavigationLinkProps;

const ShoppingCartIcon: FC<ShoppingCartIconProps> = props => (
  <ShoppingCartIconUI
    filledShoppingCartLink={<CSKNavigationLink {...props} />}
    emptyShoppingCartLink={<CSKNavigationLink {...props} link={undefined} />}
    animateWhenEmpty={true}
    {...props}
  />
);

export default ShoppingCartIcon;
