import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import { Breadcrumbs, BreadcrumbsParameters } from '@uniformdev/csk-components/components/canvas/serverOnly';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { TextArgTypes } from '@/argTypes';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';
import theme from '../../../../themeData.json';

const fontKeys = theme.fonts.map(font => font.fontKey);

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Component Starter Kit/Components/Breadcrumbs',
  component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

const {
  text: _text,
  tag: _tag,
  decoration: _decoration,
  letterSpacing: _letterSpacing,
  weight: _weight,
  alignment: _alignment,
  ...restTextArgTypes
} = TextArgTypes;

const argTypes: Partial<ArgTypes<BreadcrumbsParameters>> = {
  title: { control: 'text' },
  separator: { control: 'select', options: ['slash', 'chevron'] },
  ...restTextArgTypes,
};
export const Default: Story = {
  args: {
    title: 'Component Starter Kit/Components/Breadcrumbs',
    separator: 'chevron',
    size: 'base',
    color: 'text-primary',
    font: fontKeys[0],
    links: [
      {
        link: {
          type: 'projectMapNode',
          path: '/',
          nodeId: 'b90aa0bf-891d-4e40-9899-0d79eb1b26af',
          projectMapId: '537d11ff-9ebe-4420-9682-36694477e2f9',
        },
        title: 'Home',
      },
      {
        title: 'Test',
      },
      {
        link: {
          type: 'url',
          path: 'http://localhost:3000',
        },
        title: 'Item',
      },
      {
        link: {
          type: 'url',
          path: 'http://localhost:3000',
        },
        title: 'Item',
      },
    ],
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('breadcrumbs', undefined, {
      ...args,
    });
    return (
      <UniformComposition
        {...route}
        resolveComponent={createComponentResolver({
          breadcrumbs: Breadcrumbs,
        })}
      />
    );
  },
};
