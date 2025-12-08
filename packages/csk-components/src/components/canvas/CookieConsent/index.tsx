import dynamic from 'next/dynamic';
import { ContainerParameters } from '@/components/canvas/Container/parameters';
import { ContentAlignment } from '@/components/ui/Banner';
import { ComponentProps } from '@/types/cskTypes';

export enum CookieConsentSlots {
  CookieConsentContent = 'cookieConsentContent',
}

export type CookieConsentParameters = ContainerParameters & {
  allowButtonText?: string;
  allowTextColor?: string;
  allowButtonColor?: string;
  allowButtonHoverColor?: string;
  declineButtonText?: string;
  declineTextColor?: string;
  declineButtonColor?: string;
  declineButtonHoverColor?: string;
};

export type CookieConsentProps = ComponentProps<CookieConsentParameters, CookieConsentSlots>;

export { ContentAlignment };

export default dynamic(() => import('./cookie-consent').then(mod => mod.default));
export { CookieConsentEmptyPlaceholder } from './empty-placeholder';
