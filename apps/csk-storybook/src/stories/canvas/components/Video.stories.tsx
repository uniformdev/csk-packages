import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Video } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { VideoArgTypes } from '@/argTypes';
import { IMAGE_ASSET } from '@/assets';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { Meta, StoryObj } from '@storybook/react';

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
        _id: '',
        type: 'video',
        fields: {
          url: {
            type: 'text',
            value: 'https://res.cloudinary.com/uniform-demos/video/upload/v1693387616/videos/pexels-cristian-rojas.mp4',
          },
        },
        _source: 'custom-url',
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
        serverContext={fakeContext}
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
        route={route}
        resolveComponent={createComponentResolver({
          video: { component: Video },
        })}
        mode="server"
      />
    );
  },
};
