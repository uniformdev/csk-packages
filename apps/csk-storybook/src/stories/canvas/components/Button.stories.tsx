import { Button } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver, { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { SMILE_ASSET } from '@/assets';
import { createFakeCompositionData } from '@/utils';
import { Meta, StoryObj } from '@storybook/nextjs';
import theme from '../../../../themeData.json';
import { ButtonArgTypes } from '../../../argTypes';

const sizeKeys = theme.dimensions.map(dimension => dimension.dimensionKey).filter(key => key.startsWith('button'));

const meta: Meta<typeof Button> = {
  title: 'Component Starter Kit/Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

const componentMapper: ComponentMapping = {
  button: Button,
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
    return <UniformComposition {...route} resolveComponent={createComponentResolver(componentMapper)} />;
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
    return <UniformComposition {...route} resolveComponent={createComponentResolver(componentMapper)} />;
  },
};
