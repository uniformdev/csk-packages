import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseBanner, { BannerVariants, ContentAlignment } from '@/components/ui/Banner';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { BannerProps, BannerParameters } from '.';

const Banner: FC<BannerProps & BannerParameters> = ({
  backgroundColor,
  spacing,
  border,
  fluidContent,
  iconColor,
  contentAlignment = ContentAlignment.Center,
  floating = false,
  slots,
  variant,
}) => {
  return (
    <BaseBanner
      {...{
        backgroundColor,
        spacing,
        border,
        fluidContent,
        iconColor,
        contentAlignment,
        floating,
        variant: variant as BannerVariants,
      }}
    >
      <UniformSlot slot={slots.bannerContent} />
    </BaseBanner>
  );
};

export default withFlattenParameters(Banner);
