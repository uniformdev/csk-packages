import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-react';
import ShoppingCartUI from '@/components/custom-ui/ShoppingCart';

enum ShoppingCartSlots {
  CheckoutButton = 'checkoutButton',
  EmptyCartContent = 'emptyCartContent',
}

type ShoppingCartParameters = {
  primaryTextColor?: string;
  secondaryTextColor?: string;
};

type ShoppingCartProps = ComponentProps<ShoppingCartParameters>;

const ShoppingCart: FC<ShoppingCartProps> = props => (
  <ShoppingCartUI
    {...props}
    emptyCartContent={<UniformSlot name={ShoppingCartSlots.EmptyCartContent} />}
    checkoutButton={<UniformSlot name={ShoppingCartSlots.CheckoutButton} />}
  />
);

export default ShoppingCart;
