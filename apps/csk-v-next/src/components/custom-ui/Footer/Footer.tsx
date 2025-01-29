import { FC } from 'react';
import { Container, Flex } from '@uniformdev/csk-components/components/ui';
import ItemWrapper from '@/components/custom-ui/ItemWrapper';
import { FooterProps } from './';

export const Footer: FC<FooterProps> = ({
  ctaSection,
  logo,
  content,
  copyright,
  backgroundColor,
  spacing,
  border,
  fluidContent,
}) => (
  // eslint-disable-next-line tailwindcss/no-contradicting-classname
  <footer className="bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-70% to-[#b060ff]">
    <Container className="bg-white/80" {...{ backgroundColor, spacing, border, fluidContent }}>
      <div className="m-24 flex flex-col items-center gap-6">{ctaSection}</div>
      <Container className="mb-[-8px]  border-t border-black/5 py-[7px]" fluidContent>
        <Container className="border-t border-black/5" fluidContent>
          <Flex className="flex-wrap *:w-max" alignItems="center" justifyContent="between">
            <ItemWrapper>{logo}</ItemWrapper>
            {content}
          </Flex>
        </Container>
      </Container>
      <Container className="mb-14  border-y border-black/5 py-[7px]" fluidContent>
        <Container className="border-y border-black/5" fluidContent>
          <Flex className="flex-wrap *:w-max" alignItems="center" justifyContent="between">
            {copyright}
          </Flex>
        </Container>
      </Container>
    </Container>
  </footer>
);
