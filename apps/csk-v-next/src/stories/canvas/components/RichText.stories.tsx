import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import RichText, { RichTextParameters } from '@/components/canvas/RichText';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';
import { richTextDefault } from '../../canvasMock/components/richText';

const colorKeys = Object.keys(theme.extend.colors || {});
const fontKeys = Object.keys(theme.extend.fontFamily || {});

const meta: Meta<typeof RichText> = {
  title: 'Component Starter Kit/Components/RichText',
  component: RichText,
};

export default meta;
type Story = StoryObj<typeof RichText>;

const argTypes: Partial<ArgTypes<RichTextParameters>> = {
  color: { control: 'select', options: colorKeys },
  font: { control: 'select', options: fontKeys },
  lineCountRestrictions: { control: 'select', options: ['1', '2', '3', '4', '5', '6', 'none'] },
};
export const Default: Story = {
  args: {
    color: 'text-primary',
    font: fontKeys[0],
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('richText', undefined, {
      ...args,
      text: richTextDefault,
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver({
          richText: { component: RichText },
        })}
        mode="server"
      />
    );
  },
};
