'use client';

import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import Container from '@/components/ui/Container';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { ImageGalleryParameters, ImageGalleryProps } from '.';

const ImageGallery: FC<ImageGalleryProps & ImageGalleryParameters> = ({
  slots,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  height,
}) => (
  <Container {...{ backgroundColor, spacing, border, fluidContent, height }}>
    <div className="flex flex-col gap-1">
      <UniformSlot slot={slots.imageGalleryItems} />
    </div>
  </Container>
);

export default withFlattenParameters(ImageGallery);
