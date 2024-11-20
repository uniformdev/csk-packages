import { PropsWithChildren, ReactNode } from 'react';
import { ContainerProps } from '../Container';

export type HeaderProps = PropsWithChildren &
  Omit<ContainerProps, 'fluidContent' | 'fullHeight'> & {
    leftSection?: ReactNode;
    rightSection?: ReactNode;
    color?: string;
    sticky?: boolean;
  };

export { Header as default } from './Header';
