import { IMAGE_ASSET } from '../../assets';
import { createUniformParameter } from '../../utils';

export const reviewsDefault = {
  reviewImage: [
    {
      type: 'image',
      parameters: createUniformParameter({
        image: IMAGE_ASSET,
        objectFit: 'cover',
      }),
    },
  ],
  reviewContent: [
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'p',
        text: "Can't say enough good things",
        weight: 'bold',
      }),
    },
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'span',
        text: "Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.",
        weight: 'normal',
      }),
    },
  ],
  reviewPersonInfo: [
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'p',
        size: 'base',
        text: 'Hector Gibbons',
        weight: 'bold',
      }),
    },
    {
      type: 'text',
      parameters: createUniformParameter({
        tag: 'p',
        size: 'base',
        text: 'July 12, 2021',
        color: 'text-tertiary',
        weight: 'normal',
      }),
    },
  ],
};
