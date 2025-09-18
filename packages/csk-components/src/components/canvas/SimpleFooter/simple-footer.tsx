import { FC } from 'react';
import Image from 'next/image';
import { UniformRichText, ComponentParameter } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseFooter from '@/components/ui/Footer';
import { ReplaceFieldsWithAssets } from '@/types/cskTypes';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { SimpleFooterParameters, SimpleFooterProps } from '.';

export const Footer: FC<SimpleFooterProps & ReplaceFieldsWithAssets<SimpleFooterParameters, 'logo'>> = ({
  logo,
  parameters,
  component,
}) => (
  <BaseFooter
    logo={logo?.[0]?.url && <Image src={logo?.[0]?.url} alt="Logo" width={180} height={47} />}
    copyright={<UniformRichText parameter={parameters.copyright as ComponentParameter<string>} component={component} />}
    content={<UniformRichText parameter={parameters.content as ComponentParameter<string>} component={component} />}
    backgroundColor="general-color-1"
    spacing={{
      paddingTop: 'container-small',
      paddingBottom: 'container-small',
    }}
    border="border-footer"
    fluidContent={false}
  />
);

export default withFlattenParameters(Footer);
