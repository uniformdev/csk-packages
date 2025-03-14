import { FC } from 'react';
import BaseContainer from '@/components/ui/Container';
import { FooterProps } from './';

export const Footer: FC<FooterProps> = ({ logo, content, backgroundColor, spacing, border, fluidContent }) => (
  <footer>
    <BaseContainer {...{ backgroundColor, spacing, border, fluidContent }}>
      <BaseContainer className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
        <div>{content}</div>
        <div>{logo}</div>
      </BaseContainer>
    </BaseContainer>
  </footer>
);
