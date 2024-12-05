import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import ThemeSwitcher, { ThemeSwitcherParameters } from '@/components/canvas/ThemeSwitcher';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Component Starter Kit/Components/ThemeSwitcher',
  component: ThemeSwitcher,
};

const colorKeys = Object.keys(theme.extend.colors || {});

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

const argTypes: Partial<ArgTypes<ThemeSwitcherParameters>> = {
  iconColor: {
    control: 'select',
    options: colorKeys,
  },
};

export const Default: Story = {
  args: {
    iconColor: 'general-color-2',
  },
  argTypes,
  render: args => {
    const route = createFakeCompositionData('themeSwitcher', undefined, {
      ...args,
    });
    return (
      <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <UniformComposition
          serverContext={fakeContext}
          params={{}}
          searchParams={{}}
          route={route}
          resolveComponent={createComponentResolver({
            themeSwitcher: { component: ThemeSwitcher },
          })}
          mode="server"
        />
      </NextThemeProvider>
    );
  },
};
