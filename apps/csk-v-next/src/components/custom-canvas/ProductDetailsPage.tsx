import { FC } from 'react';
import { Page as CSKPage, PageProps as CSKPageProps } from '@uniformdev/csk-components/components/canvas';

type ContainerProps = CSKPageProps & {
  subCategory?: unknown;
};

const Container: FC<ContainerProps> = ({ subCategory: _, ...props }) => {
  return <CSKPage {...props} />;
};

export default Container;
