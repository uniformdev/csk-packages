import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import Countdown, { CountdownParams, CountdownProps, CountdownVariants } from '@/components/canvas/Countdown';
import { TextParameters } from '@/components/canvas/Text';
import { createFakeCompositionData, fakeContext } from '@/stories/utils';
import createComponentResolver from '@/utils/createComponentResolver';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import theme from '../../../../tailwind.config.theme.json';
import { TextArgTypes, ContainerArgTypes } from '../../argTypes';

type FutureDateSettings = {
  daysAhead?: number;
};

const getFutureDate = ({ daysAhead = 1 }: FutureDateSettings = {}) => {
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(futureDate.getDate() + daysAhead);
  return futureDate.toISOString();
};

const colorKeys = Object.keys(theme.extend.colors || {});

const meta: Meta<typeof Countdown> = {
  title: 'Component Starter Kit/Components/Countdown',
  component: Countdown,
};

export default meta;
type Story = StoryObj<typeof Countdown>;

const argTypes: Partial<ArgTypes<CountdownParams>> = {
  targetDate: { control: 'date' },
  backgroundColor: { control: 'select', options: colorKeys },
  textColor: { control: 'select', options: colorKeys },
  size: TextArgTypes.size,
  border: ContainerArgTypes.border,
};

const getStory = ({
  futureDateSettings,
  backgroundColor,
  size = 'base',
  variant,
}: {
  futureDateSettings?: FutureDateSettings;
  backgroundColor?: string;
  size?: TextParameters['size'];
  variant?: CountdownVariants;
} = {}): Story => ({
  args: {
    targetDate: {
      datetime: getFutureDate(futureDateSettings),
    },
    backgroundColor,
    size,
  },
  argTypes,
  render: (renderArgs: CountdownProps) => {
    const targetDate = {
      datetime:
        typeof renderArgs.targetDate === 'number'
          ? new Date(renderArgs.targetDate as unknown as number).toISOString()
          : renderArgs.targetDate?.datetime,
    };
    const route = createFakeCompositionData('countdown', variant, {
      ...renderArgs,
      targetDate,
    });
    return (
      <UniformComposition
        serverContext={fakeContext}
        params={{}}
        searchParams={{}}
        route={route}
        resolveComponent={createComponentResolver({
          countdown: { component: Countdown },
        })}
        mode="server"
      />
    );
  },
});

export const Default = getStory();
export const WithDaysCountdown = getStory({ futureDateSettings: { daysAhead: 10 } });
export const WithBackgroundColor = getStory({ backgroundColor: 'button-tertiary' });
export const WithLabelsUnderVariant = getStory({ variant: CountdownVariants.LabelsUnder });
export const WithBigSize = getStory({ size: '7xl' });
