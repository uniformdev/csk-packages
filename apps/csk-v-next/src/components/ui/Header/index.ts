import { ReactNode } from 'react';
import { ContainerProps as BaseContainerProps } from '@/components/ui/Container';

export type HeaderProps = Omit<BaseContainerProps, 'fluidContent' | 'fullHeight'> & {
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  color?: string;
  sticky?: boolean;
};

export { Header as default } from './header';
