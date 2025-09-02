import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Text, TextParameters } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { TextArgTypes } from '@/argTypes';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../themeData.json';

const fontKeys = theme.fonts.map(font => font.fontKey);

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
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
        route={route}
        resolveComponent={createComponentResolver({
          text: { component: Text },
        })}
        mode="server"
      />
    );
  },
};
