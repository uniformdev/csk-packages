'use client';

import { FC, ReactElement, useMemo } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { useCard } from '@/modules/cart/CardProvider';

enum ShoppingCartSlots {
  Products = 'products',
}

type ShoppingCartProps = ComponentProps<unknown, ShoppingCartSlots>;

type SlotType = ReactElement<{ children: ReactElement<{ children: ReactElement<{ title: string }> }>[] }>;

const ShoppingCartClient: FC<ShoppingCartProps> = ({ slots, context, component }) => {
  const { storedCart } = useCard();

  const isEditorPreviewMode = context.previewMode === 'editor' && context.isContextualEditing;

  const filteredSlots = useMemo(() => {
    if (isEditorPreviewMode) {
      return slots.products.items?.slice(0, 2);
    }
    return slots.products.items.filter(slot => {
      const slotInnet = (slot as SlotType)?.props?.children[0];

      const prouctSlug = slotInnet?.props?.children.props.title;

      const isProductInCart = storedCart[prouctSlug];

      return isProductInCart;
    });
  }, [slots, isEditorPreviewMode, storedCart]);

  return (
    <div>
      <UniformSlot
        context={context}
        slot={{
          name: 'products',
          items: filteredSlots,
        }}
        data={component}
      />
    </div>
  );
};

export default ShoppingCartClient;
