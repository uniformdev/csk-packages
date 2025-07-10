import dynamic from 'next/dynamic';
import { ComponentProps } from '@/types/cskTypes';

export type ThemeSwitcherParameters = {
  iconColor?: string;
};

export type ThemeSwitcherProps = ComponentProps<ThemeSwitcherParameters>;

export default dynamic(() => import('./theme-switcher').then(mod => mod.default));
