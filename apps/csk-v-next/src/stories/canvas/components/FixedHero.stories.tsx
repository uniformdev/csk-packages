import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import DemoHero, {
  DemoHeroParameters as FixedHeroParameters,
  DemoHeroVariants as FixedHeroVariants,
} from '@/components/canvas/DemoHero';
import { ButtonArgTypes, ContainerArgTypes, TextArgTypes } from '@/stories/argTypes';
import { getFixedHeroContent } from '@/stories/canvasMock/components/fixedHero';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';

type AddPrefix<T, Prefix extends string> = {
  [Key in keyof T as `${Prefix}${Capitalize<string & Key>}`]: T[Key];
};
const addPrefix = <T extends Record<string, unknown>, Prefix extends string>(
  obj: T,
  prefix: Prefix
): AddPrefix<T, Prefix> => {
  return Object.entries(obj).reduce(
    (result, [key, value]) => {
      const prefixedKey = `${prefix}${key.charAt(0).toUpperCase()}${key.slice(1)}`;
      return {
        ...result,
        [prefixedKey]: value,
      };
    },
    {} as AddPrefix<T, Prefix>
  );
};

const meta: Meta<typeof DemoHero.FixedHero> = {
  title: 'Component Starter Kit/Components/FixedHero',
  component: DemoHero.FixedHero,
};

export default meta;
type Story = StoryObj<typeof DemoHero.FixedHero>;

const { displayName, fullHeight } = ContainerArgTypes;
const { text, tag, color } = TextArgTypes;
const { text: buttonText } = ButtonArgTypes;

const argTypes: Partial<ArgTypes<FixedHeroParameters>> = {
  displayName,
  ...addPrefix({ text, color }, 'eyebrowTitle'),
  ...addPrefix({ text, tag, color }, 'title'),
  ...addPrefix({ text, color }, 'description'),
  ...addPrefix({ text: buttonText }, 'primaryButton'),
  contentAlignment: { control: 'select', options: ['left', 'center', 'right'] },
  fullHeight,
};

const renderStory = (variant?: FixedHeroVariants) => (args: FixedHeroParameters) => {
  const route = createFakeCompositionData('fixedHero', variant, {
    ...args,
  });
  return (
    <UniformComposition
      serverContext={fakeContext}
      params={{}}
      searchParams={{}}
      route={route}
      resolveComponent={createComponentResolver({
        fixedHero: { component: DemoHero.FixedHero },
      })}
      mode="server"
    />
  );
};

export const Default: Story = {
  args: getFixedHeroContent(),
  argTypes,
  render: renderStory(),
};

export const Columns: Story = {
  args: getFixedHeroContent(FixedHeroVariants.Columns),
  argTypes,
  render: renderStory(FixedHeroVariants.Columns),
};

export const ColumnsReverse: Story = {
  args: getFixedHeroContent(FixedHeroVariants.ColumnsReverse),
  argTypes,
  render: renderStory(FixedHeroVariants.ColumnsReverse),
};
