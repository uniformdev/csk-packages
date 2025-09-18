import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UniformText, ComponentParameter } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseHeader from '@/components/ui/Header';
import BaseIconLabel from '@/components/ui/IconLabel';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { SimpleHeaderParameters, SimpleHeaderProps, SimpleHeaderVariants } from '.';

const SimpleHeader: FC<SimpleHeaderProps & ReplaceFieldsWithAssets<SimpleHeaderParameters, 'logo'>> = ({
  variant,
  logo,
  parameters,
  component,
  link1Link,
  link2Link,
}) => {
  return (
    <BaseHeader
      sticky={variant === SimpleHeaderVariants.Sticky}
      leftSection={
        logo?.[0]?.url && (
          <Link href="/">
            <Image src={logo?.[0]?.url} alt="Logo" width={50} height={40} />
          </Link>
        )
      }
      backgroundColor="general-color-1"
      color="general-color-1"
      spacing={{
        paddingTop: 'container-small',
        paddingBottom: 'container-small',
      }}
      border="none"
    >
      <Link href={link1Link?.path || ''}>
        <BaseIconLabel
          className="group"
          size="base"
          tag="span"
          color="text-primary"
          weight="normal"
          font="sans"
          letterSpacing="normal"
          alignment="left"
        >
          <UniformText
            placeholder="Text goes here"
            parameter={parameters.link1Title as ComponentParameter<string>}
            className="whitespace-nowrap"
            component={component}
          />
        </BaseIconLabel>
      </Link>
      <Link href={link2Link?.path || ''}>
        <BaseIconLabel
          className="group"
          size="base"
          tag="span"
          color="text-primary"
          weight="normal"
          font="sans"
          letterSpacing="normal"
          alignment="left"
        >
          <UniformText
            placeholder="Text goes here"
            parameter={parameters.link2Title as ComponentParameter<string>}
            className="whitespace-nowrap"
            component={component}
          />
        </BaseIconLabel>
      </Link>
    </BaseHeader>
  );
};

export default withFlattenParameters(SimpleHeader);
