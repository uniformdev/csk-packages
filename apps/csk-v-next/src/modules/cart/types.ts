export type StoredCartItem = {
  productSlug: string;
  quantity: number;
};

export type StoredCart = {
  [key: string]: StoredCartItem;
};
