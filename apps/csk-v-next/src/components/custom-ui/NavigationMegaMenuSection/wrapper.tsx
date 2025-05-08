import { FC, Fragment, PropsWithChildren } from 'react';
import BaseLink from '@/components/ui/Link';

type WrapperProps = PropsWithChildren & {
  href: string;
  isExternalLink: boolean;
};

export const Wrapper: FC<WrapperProps> = ({ href, isExternalLink, children }) => {
  if (!href) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <BaseLink link={href} openInNewTab={isExternalLink} rel={isExternalLink ? 'noopener noreferrer' : ''}>
      {children}
    </BaseLink>
  );
};
