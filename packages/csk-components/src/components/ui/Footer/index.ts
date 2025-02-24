import { ContainerProps as BaseContainerProps } from '@/components/ui/Container';

export type FooterProps = Omit<BaseContainerProps, 'fullHeight' | 'content'> & {
  logo?: React.ReactNode;
  copyright?: React.ReactNode;
  content?: React.ReactNode;
};

export { Footer as default } from './footer';
