import { FC, PropsWithChildren } from 'react';
import BaseLink from '@/new-components/ui/Link';

type NavigationLinkWrapperProps = PropsWithChildren & {
  href: string;
  isExternalLink: boolean;
};

const NavigationLinkWrapper: FC<NavigationLinkWrapperProps> = ({ href, isExternalLink, children }) => {
  if (!href) {
    return <div className="cursor-pointer">{children}</div>;
  }

  return (
    <BaseLink
      className="cursor-pointer hover:no-underline"
      link={href}
      openInNewTab={isExternalLink}
      rel={isExternalLink ? 'noopener noreferrer' : ''}
    >
      {children}
    </BaseLink>
  );
};

export default NavigationLinkWrapper;
