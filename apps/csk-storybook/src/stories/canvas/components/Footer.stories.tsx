import {
  Flex,
  Footer,
  Grid,
  GridItem,
  Image,
  NavigationLink,
  RichText,
  Spacer,
  Text,
  FooterParameters,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { ContainerArgTypes } from '@/argTypes';
import { footerDefault } from '@/canvasMock/components/footer';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Footer> = {
  title: 'Component Starter Kit/Components/Footer',
  component: Footer,
};

export default meta;
type Story = StoryObj<typeof Footer>;

const argTypes: Partial<ArgTypes<FooterParameters>> = {
  backgroundColor: ContainerArgTypes.backgroundColor,
  border: ContainerArgTypes.border,
  fluidContent: ContainerArgTypes.fluidContent,
};

export const Default: Story = {
  args: {
    backgroundColor: 'text-secondary',
    spacing: {
      marginTop: 'container-small',
      marginBottom: 'container-small',
      marginRight: 'container-small',
      marginLeft: 'container-small',
      paddingTop: 'container-medium',
      paddingBottom: 'container-medium',
      paddingRight: 'container-medium',
      paddingLeft: 'container-medium',
    },
    border: 'border-footer',
    fluidContent: false,
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData(
      'footer',
      undefined,
      {
        ...args,
      },
      footerDefault
    );
    return (
      <UniformComposition
        {...route}
        resolveComponent={createComponentResolver({
          footer: Footer,
          text: Text,
          image: Image,
          richText: RichText,
          flex: Flex,
          navigationLink: NavigationLink,
          grid: Grid,
          gridItem: GridItem,
          spacer: Spacer,
        })}
      />
    );
  },
};
