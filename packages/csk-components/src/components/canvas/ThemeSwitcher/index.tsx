import dynamic from 'next/dynamic';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';

export type ThemeSwitcherParameters = {
  iconColor?: string;
};

export type ThemeSwitcherProps = ComponentProps<ThemeSwitcherParameters>;

export default dynamic(() => import('./theme-switcher').then(mod => mod.ThemeSwitcher));
