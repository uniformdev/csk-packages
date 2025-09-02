import { PropsWithChildren } from 'react';

export type DesignExtensionsProviderProps = PropsWithChildren<{
  isPreviewMode?: boolean;
  tokenConfiguration?: {
    colors: string;
    dimensions: string;
    defaultFont: string | undefined;
    borders: string;
  } | null;
}>;

export { DesignExtensionsProvider as default } from './design-extensions-provider';
