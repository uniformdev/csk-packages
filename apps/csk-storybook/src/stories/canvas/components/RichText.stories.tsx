import { RichText, RichTextParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { richTextDefault } from '@/canvasMock/components/richText';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';
import theme from '../../../../themeData.json';

const colorKeys = theme.colors.map(color => color.colorKey);
const fontKeys = theme.fonts.map(font => font.fontKey);

const meta: Meta<typeof RichText> = {
  title: 'Component Starter Kit/Components/RichText',
  component: RichText,
};

export default meta;
type Story = StoryObj<typeof RichText>;

const argTypes: Partial<ArgTypes<RichTextParameters>> = {
  color: { control: 'select', options: colorKeys },
  font: { control: 'select', options: fontKeys },
  size: { control: 'select', options: ['sm', 'base', 'lg', 'xl', '2xl'] },
  lineCountRestrictions: {
    control: 'select',
    options: ['1', '2', '3', '4', '5', '6', 'none'],
  },
};
export const Default: Story = {
  args: {
    color: 'text-primary',
    font: fontKeys[0],
    size: 'base',
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('richText', undefined, {
      ...args,
      text: richTextDefault,
    });
    return (
      <UniformComposition
        {...route}
        resolveComponent={createComponentResolver({
          richText: RichText,
        })}
      />
    );
  },
};
