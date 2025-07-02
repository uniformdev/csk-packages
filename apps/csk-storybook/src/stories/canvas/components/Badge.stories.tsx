import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Badge, BadgeParameters } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../themeData.json';

const colorKeys = theme.colors.map(color => color.colorKey);
const sizeKeys = theme.dimensions.map(dimension => dimension.dimensionKey);

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
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
        route={route}
        resolveComponent={createComponentResolver({
          badge: { component: Badge },
        })}
        mode="server"
      />
    );
  },
};
