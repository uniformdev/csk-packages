import type { RootComponentInstance } from '@uniformdev/canvas';

export type UserRecommendationsFromCanvas = {
  products: {
    title: string;
  }[];
  composition?: RootComponentInstance;
  code: string | undefined;
};

export type PageRecommendationsFromCanvas = {
  composition: RootComponentInstance | undefined;
  code: string | undefined;
};

export type CartFromCanvas = { composition: RootComponentInstance | undefined; code: string | undefined };

export type RelatedProductsFromCanvas = { composition: RootComponentInstance | undefined; code: string | undefined };

export type ContextRecommendationsFromCanvas = {
  composition: RootComponentInstance | undefined;
  code: string | undefined;
};

export type CartResult = {
  products: {
    slug: string;
    title: string;
  }[];
  total: number;
};

export type RelatedProductsResult = {
  products: {
    slug: string;
    title: string;
  }[];
};

export type PreviewPageParams = {
  url: string;
  title?: string;
  description?: string;
  image?: string;
};
