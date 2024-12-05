import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import Text, { TextParameters } from '@/components/canvas/Text';
import { TextArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';

const fontKeys = Object.keys(theme.extend.fontFamily || {});

const meta: Meta<typeof Text> = {
  title: 'Component Starter Kit/Components/Text',
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

const argTypes: Partial<ArgTypes<TextParameters>> = {
  ...TextArgTypes,
};
export const Default: Story = {
  args: {
    text: 'Frequently Asked Questions',
    tag: 'h1',
    size: 'base',
    color: 'text-primary',
    font: fontKeys[0],
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('text', undefined, {
      ...args,
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver({
          text: { component: Text },
        })}
        mode="server"
      />
    );
  },
};
