import { ReactNode } from 'react';
import { ContainerProps } from '@uniformdev/csk-components/components/ui';

export type FooterProps = Omit<ContainerProps, 'fullHeight' | 'content'> & {
  ctaSection?: ReactNode;
  logo?: ReactNode;
  copyright?: ReactNode;
  content?: ReactNode;
};

export { Footer as default } from './Footer';
