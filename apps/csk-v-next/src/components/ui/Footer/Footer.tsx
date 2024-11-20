import { FC } from 'react';
import Container from '@/components/ui/Container';
import { FooterProps } from './';

export const Footer: FC<FooterProps> = ({
  logo,
  content,
  copyright,
  backgroundColor,
  spacing,
  border,
  fluidContent,
}) => (
  <footer>
    <Container {...{ backgroundColor, spacing, border, fluidContent }}>
      <Container className="flex w-full flex-col justify-between gap-4 md:flex-row">
        <div className="flex flex-col gap-2 gap-y-4 md:w-1/2">
          {logo}
          {copyright}
        </div>
        <div>{content}</div>
      </Container>
    </Container>
  </footer>
);
