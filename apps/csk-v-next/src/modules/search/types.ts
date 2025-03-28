import { GetEntriesResponse } from '@uniformdev/canvas';
import { ParameterRichTextValue } from '@uniformdev/richtext';

export type UniformContentEntry = GetEntriesResponse['entries']['0']['entry'];

type UniformContentEntrySystemParams = {
  id: string;
  slug?: string;
  contentType: string;
};

export type WithUniformContentEntrySystemParams<T> = T & UniformContentEntrySystemParams;

export type FilterByItem = {
  title: string;
  value: string;
};

export type FilterBy = {
  title: string;
  fieldId: string;
  fieldKey: string;
  multiSelect: boolean;
  values: FilterByItem[];
};

export type Pagination<Item> = {
  items: Item[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export enum ContentType {
  Article = 'article',
  Product = 'product',
}

export type MappedAsset = {
  url: string;
  title: string;
  width: number;
  height: number;
  mediaType: string;
  id: string;
  size: number;
};

export type Author = {
  name: string;
  about: string;
  thumbnail: MappedAsset[];
};

export type ArticleCategory = {
  title: string;
};

export type ProductCategory = {
  title: string;
  description: string;
  logo: MappedAsset[];
  displayPriority: boolean;
};

export type Article = {
  title: string;
  publishDate: string;
  content: ParameterRichTextValue;
  shortDescription: string;
  author: Author;
  category: ArticleCategory;
  thumbnail: MappedAsset[];
};

export type ProductVariant = {
  code: string;
  currency: string;
  price: number;
  title: string;
  imageGallery: MappedAsset[];
};

export type Brand = {
  title: string;
  description: string;
  logo: MappedAsset[];
};

export type Product = {
  title: string;
  name: string;
  shortDescription: string;
  primaryImage: MappedAsset[];
  brand: Brand;
  variants: ProductVariant[];
  recommendations: Product[];
};

export type Facets = {
  [key: string]: {
    [key: string]: number;
  };
};
