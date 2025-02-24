import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BaseLink from '@/components/ui/Link';
import { formatUniformLink } from '@/utils/routing';
import { LinkProps } from '.';

export const Link: FC<LinkProps> = ({ component, context, slots, link, openInNewTab }) => (
  <BaseLink link={formatUniformLink(link)} openInNewTab={openInNewTab}>
    <UniformSlot data={component} context={context} slot={slots.linkContent} />
  </BaseLink>
);
