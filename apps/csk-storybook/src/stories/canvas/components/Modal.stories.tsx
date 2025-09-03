import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import {
  Button,
  Flex,
  Spacer,
  Text,
  Modal,
  ModalParameters,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver, { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import { modalDefault, modalWithActionButtons } from '@/canvasMock/components/modal';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';
import theme from '../../../../themeData.json';

const meta: Meta<typeof Modal> = {
  title: 'Component Starter Kit/Components/Modal',
  component: Modal,
};

const colorKeys = theme.colors.map(color => color.colorKey);

const argTypes: Partial<ArgTypes<ModalParameters>> = {
  maxWidth: { control: 'select', options: ['small', 'medium', 'large'] },
  closeIconColor: { control: 'select', options: colorKeys },
  backgroundColor: { control: 'select', options: colorKeys },
  disableCloseModalOnClickOutside: { control: 'boolean' },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const componentMapper: ComponentMapping = {
  modal: Modal,
  button: Button,
  text: Text,
  spacer: Spacer,
  flex: Flex,
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
    return <UniformComposition {...route} resolveComponent={createComponentResolver(componentMapper)} />;
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
    return <UniformComposition {...route} resolveComponent={createComponentResolver(componentMapper)} />;
  },
};
