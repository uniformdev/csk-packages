import { RootComponentInstance } from '@uniformdev/canvas';

export type ProductRecommendations = {
  suggestedProducts: {
    title: string;
  }[];
  composition?: RootComponentInstance;
};
