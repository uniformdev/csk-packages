import { RootComponentInstance } from '@uniformdev/canvas';

export type InterestRecommendations = {
  products: {
    title: string;
  }[];
  composition?: RootComponentInstance;
};

export type CartPattern = {
  composition?: RootComponentInstance;
};

export type RelatedRecommendations = {
  composition?: RootComponentInstance;
};

export type CartResult = {
  products: {
    slug: string;
    title: string;
    shortDescription: string;
  }[];
  total: number;
};

export type RelatedProducts = {
  products: {
    slug: string;
    title: string;
    shortDescription: string;
  }[];
};
