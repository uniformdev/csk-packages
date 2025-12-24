import { Text, TextParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { TextArgTypes } from '@/argTypes';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';
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
        {...route}
        resolveComponent={createComponentResolver({
          text: Text,
        })}
      />
    );
  },
};
