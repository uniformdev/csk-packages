import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import { Spacer, SpacerParameters, SpacerVariants } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver, { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';
import theme from '../../../../themeData.json';

const sizeKeys = theme.dimensions.map(dimension => dimension.dimensionKey);

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
  spacer: Spacer,
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
        <UniformComposition {...route} resolveComponent={createComponentResolver(componentMapper)} />
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
        <UniformComposition {...route} resolveComponent={createComponentResolver(componentMapper)} />
        <div className="flex h-20 flex-1 items-center justify-center rounded bg-gray-200">
          <span>Block 2</span>
        </div>
      </div>
    );
  },
};
