import { ContainerProps } from '@uniformdev/csk-components/components/ui';

export type FooterProps = Omit<ContainerProps, 'fullHeight' | 'content'> & {
  logo?: React.ReactNode;
  copyright?: React.ReactNode;
  content?: React.ReactNode;
};

export { Footer as default } from './footer';
