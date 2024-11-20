import { PropsWithChildren } from 'react';

export type LinkProps = PropsWithChildren<{
  link: string;
  openInNewTab?: boolean;
  className?: string;
}>;

export { Link as default } from './Link';
