import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { Text, Button, Image } from '@/components/canvas';
import Section, { ContentAlignment, SectionParameters, SectionVariants } from '@/components/canvas/Section';
import { ContainerArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { getSectionDefaultContent } from '../../canvasMock/components/section';

const meta: Meta<typeof Section> = {
  title: 'Component Starter Kit/Components/Section',
  component: Section,
};

export default meta;
type Story = StoryObj<typeof Section>;

const { displayName: _, ...baseContainerArgTypes } = ContainerArgTypes;

const argTypes: Partial<ArgTypes<SectionParameters>> = {
  displayName: { control: 'text' },
  contentAlignment: { control: 'select', options: ['left', 'center', 'right'] },
  ...baseContainerArgTypes,
};

const renderStory = (variant?: SectionVariants) => (args: SectionParameters) => {
  const route = createFakeCompositionData(
    'section',
    variant,
    {
      ...args,
    },
    getSectionDefaultContent(variant)
  );
  return (
    <UniformComposition
      serverContext={fakeContext}
      params={{}}
      searchParams={{}}
      route={route}
      resolveComponent={createComponentResolver({
        section: { component: Section },
        text: { component: Text },
        button: { component: Button },
        image: { component: Image },
      })}
      mode="server"
    />
  );
};

export const Default: Story = {
  args: {
    displayName: 'Section',
    spacing: {
      paddingTop: 'container-xlarge',
      paddingBottom: 'container-xlarge',
    },
    contentAlignment: ContentAlignment.Center,
    backgroundColor: 'text-secondary',
    fluidContent: true,
    fullHeight: false,
  },
  argTypes,
  render: renderStory(),
};

export const Columns: Story = {
  args: {
    displayName: 'Section',
    spacing: {
      paddingTop: 'container-xlarge',
      paddingBottom: 'container-xlarge',
    },
    backgroundColor: 'text-secondary',
    fluidContent: true,
    fullHeight: false,
  },
  argTypes,
  render: renderStory(SectionVariants.Columns),
};

export const ColumnsReverse: Story = {
  args: {
    displayName: 'Section',
    spacing: {
      paddingTop: 'container-xlarge',
      paddingBottom: 'container-xlarge',
    },
    backgroundColor: 'text-secondary',
    fluidContent: true,
    fullHeight: false,
  },
  argTypes,
  render: renderStory(SectionVariants.ColumnsReverse),
};
