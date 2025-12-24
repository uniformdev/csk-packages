import { IconLabel, IconLabelParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { TextArgTypes } from '@/argTypes';
import { ICON_ASSET } from '@/assets';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';
import theme from '../../../../themeData.json';

const fontKeys = theme.fonts.map(font => font.fontKey);

const meta: Meta<typeof IconLabel> = {
  title: 'Component Starter Kit/Components/IconLabel',
  component: IconLabel,
};

export default meta;
type Story = StoryObj<typeof IconLabel>;

const argTypes: Partial<ArgTypes<IconLabelParameters>> = {
  ...TextArgTypes,
};

export const Default: Story = {
  args: {
    text: 'Private forum access',
    size: '2xl',
    color: 'text-primary',
    font: fontKeys[0],
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('iconLabel', undefined, {
      ...args,
      icon: ICON_ASSET,
    });
    return (
      <UniformComposition
        {...route}
        resolveComponent={createComponentResolver({
          iconLabel: IconLabel,
        })}
      />
    );
  },
};
