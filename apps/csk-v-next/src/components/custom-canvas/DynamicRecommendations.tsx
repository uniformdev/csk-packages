'use client';

import { FC, useState } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { Flex as CSKFlex, ContainerProps as CSKContainerProps } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';

type DynamicRecommendationsParameters = CSKContainerProps & {
  loadingIndicatorColor?: string;
};

enum DynamicRecommendationsSlots {
  DynamicRecommendationsTitle = 'dynamicRecommendationsTitle',
}

type DynamicRecommendationsProps = ComponentProps<DynamicRecommendationsParameters, DynamicRecommendationsSlots>;

const DynamicRecommendations: FC<DynamicRecommendationsProps> = ({
  component,
  context,
  slots,
  backgroundColor,
  spacing,
  fluidContent,
  fullHeight,
  border,
  loadingIndicatorColor,
}) => {
  const [isLoading] = useState(true);
  return (
    <CSKFlex
      justifyContent="center"
      direction="col"
      alignItems="center"
      gap="16"
      {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}
    >
      <UniformSlot data={component} context={context} slot={slots.dynamicRecommendationsTitle} />

      {isLoading && (
        <div className="text-center">
          <svg
            className={cn('inline size-16 animate-spin', {
              [`text-${loadingIndicatorColor}`]: loadingIndicatorColor,
            })}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading awesome stuff...</h2>
          <p className="mt-2 text-gray-500">Get ready for some great recommendations!</p>
        </div>
      )}
    </CSKFlex>
  );
};

export default DynamicRecommendations;
