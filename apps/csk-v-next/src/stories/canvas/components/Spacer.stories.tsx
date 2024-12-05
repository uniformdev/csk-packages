import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import Spacer, { SpacerParameters, SpacerVariants } from '@/components/canvas/Spacer';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver, { ComponentMapping } from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';

const sizeKeys = Object.keys(theme.extend.spacing || {}).filter(key => key.startsWith('spacer'));

const meta: Meta<typeof Spacer> = {
  title: 'Component Starter Kit/Components/Spacer',
  component: Spacer,
};

export default meta;
type Story = StoryObj<typeof Spacer>;

const argTypes: Partial<ArgTypes<SpacerParameters>> = {
  size: {
    control: 'select',
    options: sizeKeys,
  },
};

const componentMapper: ComponentMapping = {
  spacer: { component: Spacer },
};

export const Default: Story = {
  args: {
    size: sizeKeys[0],
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('spacer', undefined, {
      ...args,
    });
    return (
      <div className="flex flex-col">
        <div className="flex h-20 w-full items-center justify-center rounded bg-gray-200">
          <span>Block 1</span>
        </div>
        <UniformComposition
          serverContext={fakeContext}
          params={{}}
          searchParams={{}}
          route={route}
          resolveComponent={createComponentResolver(componentMapper)}
          mode="server"
        />
        <div className="flex h-20 w-full items-center justify-center rounded bg-gray-200">
          <span>Block 2</span>
        </div>
      </div>
    );
  },
};

export const Horizontal: Story = {
  args: {
    size: sizeKeys[0],
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('spacer', SpacerVariants.Horizontal, {
      ...args,
    });
    return (
      <div className="flex">
        <div className="flex h-20 flex-1 items-center justify-center rounded bg-gray-200">
          <span>Block 1</span>
        </div>
        <UniformComposition
          serverContext={fakeContext}
          params={{}}
          searchParams={{}}
          route={route}
          resolveComponent={createComponentResolver(componentMapper)}
          mode="server"
        />
        <div className="flex h-20 flex-1 items-center justify-center rounded bg-gray-200">
          <span>Block 2</span>
        </div>
      </div>
    );
  },
};
