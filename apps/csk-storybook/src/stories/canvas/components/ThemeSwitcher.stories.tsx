import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeSwitcher, ThemeSwitcherParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { UniformComposition } from '@uniformdev/next-app-router';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';
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
          {...route}
          resolveComponent={createComponentResolver({
            themeSwitcher: ThemeSwitcher,
          })}
        />
      </NextThemeProvider>
    );
  },
};
