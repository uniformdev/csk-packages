import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import Breadcrumbs, { BreadcrumbsParameters } from '@/components/canvas/Breadcrumbs';
import { TextArgTypes } from '@/stories/argTypes';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';

const fontKeys = Object.keys(theme.extend.fontFamily || {});

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
        fields: {
          link: {
            type: 'link',
            value: {
              path: '/',
              type: 'projectMapNode',
              nodeId: 'b90aa0bf-891d-4e40-9899-0d79eb1b26af',
              projectMapId: '537d11ff-9ebe-4420-9682-36694477e2f9',
            },
          },
          title: {
            type: 'text',
            value: 'Home',
          },
        },
      },
      {
        fields: {
          title: {
            type: 'text',
            value: 'Test',
          },
        },
      },
      {
        fields: {
          link: {
            type: 'link',
            value: {
              path: 'http://localhost:3000',
              type: 'url',
            },
          },
          title: {
            type: 'text',
            value: 'Item',
          },
        },
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
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver({
          breadcrumbs: { component: Breadcrumbs },
        })}
        mode="server"
      />
    );
  },
};
