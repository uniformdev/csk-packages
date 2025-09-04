import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import { Video } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { VideoArgTypes } from '@/argTypes';
import { IMAGE_ASSET } from '@/assets';
import { createFakeCompositionData } from '@/utils';
import { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Video> = {
  title: 'Component Starter Kit/Components/Video',
  component: Video,
};

export default meta;
type Story = StoryObj<typeof Video>;

export const Default: Story = {
  args: {
    video: [
      {
        url: 'https://res.cloudinary.com/uniform-demos/video/upload/v1693387616/videos/pexels-cristian-rojas.mp4',
        file: 'https://res.cloudinary.com/uniform-demos/video/upload/v1693387616/videos/pexels-cristian-rojas.mp4',
        id: '1',
      },
    ],
    autoPlay: false,
    loop: true,
    muted: true,
    controls: true,
    lazyLoad: true,
  },
  argTypes: VideoArgTypes,
  render: args => {
    const route = createFakeCompositionData('video', undefined, {
      ...args,
      placeholderImage: IMAGE_ASSET,
    });
    return (
      <UniformComposition
        {...route}
        resolveComponent={createComponentResolver({
          video: Video,
        })}
      />
    );
  },
};
