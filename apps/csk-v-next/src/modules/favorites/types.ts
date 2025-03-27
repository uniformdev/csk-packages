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
  imageGallery: {
    url: string;
    title: string;
  }[];
};

export type Brand = {
  title: string;
  description: string;
  logo: {
    url: string;
    title: string;
  }[];
};

export type Product = {
  slug: string;
  title: string;
  name: string;
  shortDescription: string;
  primaryImage: {
    url: string;
    title: string;
  }[];
  brand: Brand;
  variants: ProductVariant[];
  recommendations: Product[];
};
