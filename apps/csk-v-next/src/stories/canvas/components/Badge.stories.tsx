import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import Badge, { BadgeParameters } from '@/components/canvas/Badge';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';

const colorKeys = Object.keys(theme.extend.colors || {});
const sizeKeys = Object.keys(theme.extend.spacing || {}).filter(key => key.startsWith('badge'));

const meta: Meta<typeof Badge> = {
  title: 'Component Starter Kit/Components/Badge',
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

const argTypes: Partial<ArgTypes<BadgeParameters>> = {
  text: { control: 'text' },
  textColor: { control: 'select', options: colorKeys },
  backgroundColor: { control: 'select', options: colorKeys },
  borderColor: { control: 'select', options: colorKeys },
  dotColor: { control: 'select', options: colorKeys },
  pill: { control: 'boolean' },
  size: { control: 'select', options: sizeKeys },
};
export const Default: Story = {
  args: {
    text: 'Badge',
    textColor: 'text-secondary',
    backgroundColor: 'text-primary',
    size: sizeKeys[0],
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('badge', undefined, {
      ...args,
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver({
          badge: { component: Badge },
        })}
        mode="server"
      />
    );
  },
};
