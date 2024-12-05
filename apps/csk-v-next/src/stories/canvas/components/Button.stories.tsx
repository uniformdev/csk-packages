import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import Button from '@/components/canvas/Button';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver, { ComponentMapping } from '@/utils/createComponentResolver';
import { Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';
import { ButtonArgTypes } from '../../argTypes';
import { SMILE_ASSET } from '../../assets';

const sizeKeys = Object.keys(theme.extend.spacing || {}).filter(key => key.startsWith('button'));

const meta: Meta<typeof Button> = {
  title: 'Component Starter Kit/Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

const componentMapper: ComponentMapping = {
  button: { component: Button },
};

export const Default: Story = {
  args: {
    text: 'Button',
    link: { type: 'url', path: '/' },
    textColor: 'text-secondary',
    textTransform: 'normal-case',
    textWeight: 'medium',
    buttonColor: 'button-primary',
    hoverButtonColor: 'button-secondary',
    size: sizeKeys[0],
    textSize: 'base',
  },
  argTypes: ButtonArgTypes,
  render: args => {
    const route = createFakeCompositionData('button', undefined, {
      ...args,
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver(componentMapper)}
        mode="server"
      />
    );
  },
};

export const WithIcon: Story = {
  args: {
    text: 'Button',
    link: { type: 'url', path: '/' },
    textColor: 'text-secondary',
    textTransform: 'normal-case',
    textWeight: 'medium',
    buttonColor: 'button-primary',
    hoverButtonColor: 'button-secondary',
    iconPosition: 'left',
    size: sizeKeys[0],
    textSize: 'base',
  },
  argTypes: ButtonArgTypes,
  render: args => {
    const route = createFakeCompositionData('button', undefined, {
      ...args,
      icon: SMILE_ASSET,
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver(componentMapper)}
        mode="server"
      />
    );
  },
};
