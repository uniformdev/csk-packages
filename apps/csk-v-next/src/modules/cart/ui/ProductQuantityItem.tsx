import { FC } from 'react';
import { Button } from '@uniformdev/csk-components/components/ui';

export type ProductQuantityItemProps = {
  quantity: number;
  onClickIncrement: () => void;
  onClickDecrement: () => void;
};

const ProductQuantityItem: FC<ProductQuantityItemProps> = ({ quantity, onClickIncrement, onClickDecrement }) => (
  <div className="flex h-[50px] w-44 flex-row justify-between border border-gray-100">
    <Button className="w-14 text-2xl" onClick={onClickDecrement}>
      -
    </Button>

    <div className="flex w-full items-center justify-center border-x border-gray-100">
      <span className="select-none font-bold text-black">{quantity}</span>
    </div>
    <Button className="w-14 text-2xl" onClick={onClickIncrement}>
      +
    </Button>
  </div>
);

export default ProductQuantityItem;
