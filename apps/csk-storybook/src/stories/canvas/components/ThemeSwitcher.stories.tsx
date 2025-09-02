import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { ThemeSwitcher, ThemeSwitcherParameters } from '@uniformdev/csk-components/components/canvas';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { createFakeCompositionData, fakeContext } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../themeData.json';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Component Starter Kit/Components/ThemeSwitcher',
  component: ThemeSwitcher,
};

const colorKeys = theme.colors.map(color => color.colorKey);

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
          params={Promise.resolve({})}
          searchParams={Promise.resolve({})}
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
