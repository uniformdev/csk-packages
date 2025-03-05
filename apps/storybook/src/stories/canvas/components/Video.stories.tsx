import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Video, VideoParameters } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { IMAGE_ASSET } from '@/assets';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Video> = {
  title: 'Component Starter Kit/Components/Video',
  component: Video,
};

export default meta;
type Story = StoryObj<typeof Video>;
const argTypes: Partial<ArgTypes<VideoParameters>> = {
  autoPlay: { control: 'boolean' },
  lazyLoad: { control: 'boolean' },
  loop: { control: 'boolean' },
  controls: { control: 'boolean' },
  muted: { control: 'boolean' },
};

export const Default: Story = {
  args: {
    url: {
      type: 'url',
      path: 'https://res.cloudinary.com/uniform-demos/video/upload/v1693387616/videos/pexels-cristian-rojas.mp4',
    },
    autoPlay: false,
    loop: true,
    muted: true,
    controls: true,
    lazyLoad: true,
  },
  argTypes,
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
