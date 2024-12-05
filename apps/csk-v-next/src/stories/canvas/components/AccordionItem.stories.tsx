import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Text } from '@/components/canvas';
import AccordionItem, { AccordionItemParameters } from '@/components/canvas/AccordionItem';
import { TextArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, createUniformParameter, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AccordionItem> = {
  title: 'Component Starter Kit/Components/AccordionItem',
  component: AccordionItem,
};

export default meta;
type Story = StoryObj<typeof AccordionItem>;

const { text: _, ...baseTextArgTypes } = TextArgTypes;

const argTypes: Partial<ArgTypes<AccordionItemParameters>> = {
  text: { control: 'text' },
  ...baseTextArgTypes,
};

export const Default: Story = {
  args: {
    text: 'How much does the Component Starter Kit cost?',
    tag: 'span',
    size: '2xl',
    color: 'text-secondary',
    backgroundColor: 'general-color-2',
    spacing: {
      paddingTop: 'container-small',
      paddingLeft: 'container-small',
      marginBottom: 'container-small',
      paddingRight: 'container-small',
      paddingBottom: 'container-small',
    },
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData(
      'accordionItem',
      undefined,
      {
        ...args,
      },
      {
        accordionItemContent: [
          {
            type: 'text',
            parameters: createUniformParameter({
              tag: 'span',
              size: 'xl',
              text: 'Exactly $0. These components are totally open source and available for anyone to use.',
              color: 'text-primary',
            }),
          },
        ],
      }
    );
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver({
          accordionItem: { component: AccordionItem },
          text: { component: Text },
        })}
        mode="server"
      />
    );
  },
};
