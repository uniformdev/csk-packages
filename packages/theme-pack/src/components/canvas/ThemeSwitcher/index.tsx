import dynamic from 'next/dynamic';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { withPlaygroundWrapper } from '@uniformdev/theme-pack/hocs/withPlaygroundWrapper';

export type ThemeSwitcherParameters = {
  iconColor?: string;
};

export type ThemeSwitcherProps = ComponentProps<ThemeSwitcherParameters>;

export default dynamic(() => import('./theme-switcher').then(mod => withPlaygroundWrapper(mod.ThemeSwitcher)));
