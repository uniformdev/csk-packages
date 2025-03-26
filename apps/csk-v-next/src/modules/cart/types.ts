import { Asset } from '@uniformdev/assets';
export type StoredCartItem = {
  productSlug: string;
  quantity: number;
};

export type StoredCart = {
  [key: string]: StoredCartItem;
};

export type ProductVariant = {
  code: string;
  currency: string;
  price: number;
  title: string;
  imageGallery: Asset[];
};

export type Brand = {
  title: string;
  description: string;
  logo: Asset[];
};

export type Product = {
  title: string;
  name: string;
  shortDescription: string;
  primaryImage: Asset[];
  brand: Brand;
  variants: ProductVariant[];
  recommendations: Product[];
};
