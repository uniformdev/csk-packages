import { UniformComposition } from '@uniformdev/canvas-next-rsc-v2';
import {
  DemoHero,
  FixedHeroParameters,
  FixedHeroProps,
  DemoHeroVariants as FixedHeroVariants,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import createComponentResolver from '@uniformdev/csk-components/utils/createComponentResolver';
import { ButtonArgTypes, ContainerArgTypes, TextArgTypes } from '@/argTypes';
import { getFixedHeroContent } from '@/canvasMock/components/fixedHero';
import { createFakeCompositionData } from '@/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/nextjs';

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

const { displayName, height } = ContainerArgTypes;
const { text, tag, color } = TextArgTypes;
const { text: buttonText } = ButtonArgTypes;

const argTypes: Partial<ArgTypes<FixedHeroParameters>> = {
  displayName,
  ...addPrefix({ text }, 'eyebrowTitle'),
  ...addPrefix({ text, tag }, 'title'),
  ...addPrefix({ text }, 'description'),
  ...addPrefix({ text: buttonText }, 'primaryButton'),
  contentAlignment: { control: 'select', options: ['left', 'center', 'right'] },
  textColor: color,
  overlayAutoTint: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
  height,
};

const renderStory = (variant?: FixedHeroVariants) => (args: FixedHeroProps) => {
  const route = createFakeCompositionData('fixedHero', variant, {
    ...args,
  });
  return (
    <UniformComposition
      {...route}
      resolveComponent={createComponentResolver({
        fixedHero: DemoHero.FixedHero,
      })}
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
