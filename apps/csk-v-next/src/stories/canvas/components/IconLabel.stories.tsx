import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import IconLabel, { IconLabelParameters } from '@/components/canvas/IconLabel';
import { TextArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';
import { ICON_ASSET } from '../../assets';

const fontKeys = Object.keys(theme.extend.fontFamily || {});

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
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver({
          iconLabel: { component: IconLabel },
        })}
        mode="server"
      />
    );
  },
};
