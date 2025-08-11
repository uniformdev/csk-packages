import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { LinkSlots } from '@/new-components/canvas/Link';
import BaseLink from '@/new-components/ui/Link';
import { formatUniformLink } from '@/utils/routing';
import { LinkProps } from '.';

const Link: FC<LinkProps> = ({ link, openInNewTab }) => (
  <BaseLink link={formatUniformLink(link)} openInNewTab={openInNewTab}>
    <UniformSlot name={LinkSlots.LinkContent} />
  </BaseLink>
);

export default Link;
