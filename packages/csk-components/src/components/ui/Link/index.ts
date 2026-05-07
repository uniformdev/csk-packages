import { CSSProperties, PropsWithChildren } from 'react';

export type LinkProps = PropsWithChildren<{
  link: string;
  openInNewTab?: boolean;
  className?: string;
  rel?: string;
  style?: CSSProperties;
}>;

export { Link as default } from './link';
