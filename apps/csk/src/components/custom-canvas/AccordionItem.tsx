import { FC } from 'react';
import {
  AccordionItem as CSKAccordionItem,
  AccordionItemProps as CSKAccordionItemProps,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';
import { cn, resolveViewPort } from '@uniformdev/csk-components/utils/styling';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';

type AccordionAdditionalParameters = {
  border?: string | ViewPort<string>;
};

type AccordionItemProps = CSKAccordionItemProps;

const AccordionItem: FC<AccordionItemProps & AccordionAdditionalParameters> = ({ border, ...props }) => (
  <CSKAccordionItem
    className={cn({
      [resolveViewPort(border, '{value}')]: border,
    })}
    {...props}
  />
);

export default withFlattenParameters(AccordionItem);
