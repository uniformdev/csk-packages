import { ReactNode } from 'react';
import { ContainerProps as BaseContainerProps } from '@/components/ui/Container';

export type FooterProps = Omit<BaseContainerProps, 'height' | 'content'> & {
  logo?: ReactNode;
  copyright?: ReactNode;
  content?: ReactNode;
};

export { Footer as default } from './footer';
