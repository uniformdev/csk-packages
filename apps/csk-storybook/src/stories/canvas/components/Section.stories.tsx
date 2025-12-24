import {
  Section,
  Text,
  Button,
  Image,
  SectionContentAlignment as ContentAlignment,
  SectionParameters,
  SectionVariants,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { ContainerArgTypes } from '@/argTypes';
import { getSectionDefaultContent } from '@/canvasMock/components/section';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

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
      {...route}
      resolveComponent={createComponentResolver({
        section: Section,
        text: Text,
        button: Button,
        image: Image,
      })}
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
  },
  argTypes,
  render: renderStory(SectionVariants.ColumnsReverse),
};
