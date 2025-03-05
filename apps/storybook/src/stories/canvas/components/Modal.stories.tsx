import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Button, Flex, Spacer, Text, Modal, ModalParameters } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver, { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import { modalDefault, modalWithActionButtons } from '@/canvasMock/components/modal';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';

const meta: Meta<typeof Modal> = {
  title: 'Component Starter Kit/Components/Modal',
  component: Modal,
};

const colorKeys = Object.keys(theme.extend.colors || {});

const argTypes: Partial<ArgTypes<ModalParameters>> = {
  maxWidth: { control: 'select', options: ['small', 'medium', 'large'] },
  closeIconColor: { control: 'select', options: colorKeys },
  backgroundColor: { control: 'select', options: colorKeys },
  disableCloseModalOnClickOutside: { control: 'boolean' },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const componentMapper: ComponentMapping = {
  modal: { component: Modal },
  button: { component: Button },
  text: { component: Text },
  spacer: { component: Spacer },
  flex: { component: Flex },
};

export const Default: Story = {
  args: {
    maxWidth: 'medium',
    backgroundColor: 'text-secondary',
    closeIconColor: 'text-primary',
    disableCloseModalOnClickOutside: false,
  },
  argTypes,
  render: (args: ModalParameters) => {
    const route = createFakeCompositionData(
      'modal',
      undefined,
      {
        ...args,
      },
      modalDefault
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
        route={route}
        resolveComponent={createComponentResolver(componentMapper)}
        mode="server"
      />
    );
  },
};

export const WithActionButtons: Story = {
  args: {
    maxWidth: 'medium',
    backgroundColor: 'text-secondary',
    closeIconColor: 'text-primary',
    disableCloseModalOnClickOutside: true,
  },
  argTypes,
  render: (args: ModalParameters) => {
    const route = createFakeCompositionData(
      'modal',
      undefined,
      {
        ...args,
      },
      modalWithActionButtons
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={Promise.resolve({})}
        searchParams={Promise.resolve({})}
        route={route}
        resolveComponent={createComponentResolver(componentMapper)}
        mode="server"
      />
    );
  },
};
