import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Divider, DividerParameters } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../themeData.json';

const colorKeys = theme.colors.map(color => color.colorKey);

const meta: Meta<typeof Divider> = {
  title: 'Component Starter Kit/Components/Divider',
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

const argTypes: Partial<ArgTypes<DividerParameters>> = {
  color: { control: 'select', options: colorKeys },
  thickness: {
    control: 'select',
    options: ['1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px', '9px', '10px'],
  },
  width: {
    control: 'select',
    options: ['100%', '90%', '80%', '70%', '60%', '50%', '40%', '30%', '20%', '10%'],
  },
  alignment: { control: 'select', options: ['start', 'center', 'end'] },
};
export const Default: Story = {
  args: {
    color: 'text-primary',
    thickness: '2px',
    width: '100%',
    alignment: 'center',
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('divider', undefined, {
      ...args,
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
        route={route}
        resolveComponent={createComponentResolver({
          divider: { component: Divider },
        })}
        mode="server"
      />
    );
  },
};
