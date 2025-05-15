import { FC } from 'react';
import {
  NavigationLink as CSKNavigationLink,
  NavigationLinkProps as CSKNavigationLinkProps,
} from '@uniformdev/csk-components/components/canvas';
import ShoppingCartIconClient, { ShoppingCartModalProps } from './ShoppingCartIconClient';

const ShoppingCartIcon: FC<CSKNavigationLinkProps & ShoppingCartModalProps> = props => (
  <ShoppingCartIconClient
    filledShoppingCartLink={<CSKNavigationLink {...props} />}
    emptyShoppingCartLink={<CSKNavigationLink {...props} link={undefined} />}
    animateWhenEmpty={true}
    {...props}
  />
);

export default ShoppingCartIcon;
