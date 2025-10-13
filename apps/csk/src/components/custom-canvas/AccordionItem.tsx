import { FC } from 'react';
import { ComponentProps } from '@uniformdev/canvas-react';
import {
  AccordionItem as CSKAccordionItem,
  AccordionItemParameters as CSKAccordionItemParameters,
} from '@uniformdev/csk-components/components/canvas';
import { ViewPort } from '@uniformdev/csk-components/types/cskTypes';
import { cn, resolveViewPort } from '@uniformdev/csk-components/utils/styling';

type AccordionAdditionalParameters = {
  border?: string | ViewPort<string>;
};

type AccordionItemProps = ComponentProps<CSKAccordionItemParameters & AccordionAdditionalParameters>;

const AccordionItem: FC<AccordionItemProps & AccordionAdditionalParameters> = ({ border, ...props }) => (
  <CSKAccordionItem
    className={cn({
      [resolveViewPort(border, '{value}')]: border,
    })}
    {...props}
  />
);

export default AccordionItem;
