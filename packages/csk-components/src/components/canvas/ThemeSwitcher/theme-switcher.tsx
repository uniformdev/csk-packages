'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { useUniformContext } from '@uniformdev/next-app-router/component';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { ThemeSwitcherParameters, ThemeSwitcherProps } from '.';

const BaseThemeSwitcher = dynamic(() => import('@/components/ui/ThemeSwitcher').then(mod => mod.default), {
  ssr: false,
});

export const ThemeSwitcher: FC<ThemeSwitcherProps & ThemeSwitcherParameters> = ({ iconColor }) => {
  const { context } = useUniformContext();

  const onChangeTheme = (theme: string) => {
    context?.update({
      quirks: {
        theme,
      },
    });
  };

  return <BaseThemeSwitcher iconColor={iconColor} onChange={onChangeTheme} />;
};

export default withFlattenParameters(ThemeSwitcher);
