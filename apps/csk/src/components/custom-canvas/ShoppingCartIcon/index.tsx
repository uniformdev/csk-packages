import { FC } from 'react';
import {
  NavigationLink as CSKNavigationLink,
  NavigationLinkProps as CSKNavigationLinkProps,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import ShoppingCartIconClient, { ShoppingCartParameters } from './ShoppingCartIconClient';

const ShoppingCartIcon: FC<CSKNavigationLinkProps & ShoppingCartParameters> = props => (
  <ShoppingCartIconClient
    filledShoppingCartLink={<CSKNavigationLink {...props} />}
    emptyShoppingCartLink={<CSKNavigationLink {...props} link={undefined} />}
    animateWhenEmpty={true}
    {...props}
  />
);

export default withFlattenParameters(ShoppingCartIcon);
