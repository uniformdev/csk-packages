'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { ThemeSwitcherProps } from '.';

const BaseThemeSwitcher = dynamic(() => import('@/components/ui/ThemeSwitcher').then(mod => mod.default), {
  ssr: false,
});

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ iconColor }) => {
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
