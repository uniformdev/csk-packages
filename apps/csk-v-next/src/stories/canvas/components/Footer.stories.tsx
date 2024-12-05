import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { ContainerArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
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
} from '../../../components/canvas';
import { FooterParameters } from '../../../components/canvas/Footer';
import { footerDefault } from '../../canvasMock/components/footer';

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
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver({
          footer: { component: Footer },
          text: { component: Text },
          image: { component: Image },
          richText: { component: RichText },
          flex: { component: Flex },
          navigationLink: { component: NavigationLink },
          grid: { component: Grid },
          gridItem: { component: GridItem },
          spacer: { component: Spacer },
        })}
        mode="server"
      />
    );
  },
};
