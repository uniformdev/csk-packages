import { ContainerProps } from '../Container';

export type FooterProps = Omit<ContainerProps, 'fullHeight' | 'content'> & {
  logo?: React.ReactNode;
  copyright?: React.ReactNode;
  content?: React.ReactNode;
};

export { Footer as default } from './Footer';
