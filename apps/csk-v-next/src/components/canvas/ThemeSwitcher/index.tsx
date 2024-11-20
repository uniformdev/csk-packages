'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { ComponentProps, useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { withPlaygroundWrapper } from '@/hocs';

const BaseThemeSwitcher = dynamic(() => import('@/components/ui/ThemeSwitcher').then(mod => mod.default), {
  ssr: false,
});

export type ThemeSwitcherParameters = {
  iconColor?: string;
};

type ThemeSwitcherProps = ComponentProps<ThemeSwitcherParameters>;

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ iconColor }) => {
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

export default withPlaygroundWrapper(ThemeSwitcher);
