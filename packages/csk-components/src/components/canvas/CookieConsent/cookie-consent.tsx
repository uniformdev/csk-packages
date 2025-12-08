'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ComponentParameter, UniformSlot, UniformText } from '@uniformdev/canvas-next-rsc-v2/component';
import BaseBanner, { BannerVariants } from '@/components/ui/Banner';
import BaseButton from '@/components/ui/Button';
import useCookiesConsent from '@/utils/useCookiesConsent';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { CookieConsentProps, CookieConsentParameters } from '.';

const CLIENT_COOKIE_NAME = 'hasAcceptedCookies';

const CookieConsent: FC<CookieConsentProps & CookieConsentParameters> = ({
  backgroundColor,
  spacing,
  border,
  fluidContent,
  allowTextColor,
  allowButtonColor,
  allowButtonHoverColor,
  declineTextColor,
  declineButtonColor,
  declineButtonHoverColor,
  slots,
  variant,
  parameters,
  component,
  context,
}) => {
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const { consent, updateConsent } = useCookiesConsent();
  const { defaultConsent } = context?.pageState || {};

  useEffect(() => {
    // get user has accepted cookies from cookie
    const cookieValue = Cookies.get(CLIENT_COOKIE_NAME);
    const userHasAcceptedCookies = cookieValue === undefined ? undefined : cookieValue === 'true';

    if (userHasAcceptedCookies === undefined) {
      // if user has not accepted cookies and default consent is false, show cookie consent
      if (!defaultConsent) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowCookieConsent(true);

        // if consent is true, but user has not accepted cookies, update consent to false
        if (consent) {
          updateConsent(false);
        }
      }
      return;
    }

    // if user has accepted cookies and consent is not the same, update consent
    if (consent !== userHasAcceptedCookies) {
      updateConsent(userHasAcceptedCookies);
    }
  }, [defaultConsent, consent, updateConsent, setShowCookieConsent]);

  const handleAllowCookiesButtonClick = useCallback(() => {
    updateConsent(true);
    Cookies.set(CLIENT_COOKIE_NAME, 'true');
    setShowCookieConsent(false);
  }, [updateConsent]);

  const handleDeclineCookiesButtonClick = useCallback(() => {
    updateConsent(false);
    Cookies.set(CLIENT_COOKIE_NAME, 'false');
    setShowCookieConsent(false);
  }, [updateConsent]);

  if (!showCookieConsent) return null;

  return (
    <BaseBanner
      {...{
        backgroundColor,
        spacing,
        border,
        fluidContent,
        floating: true,
        variant: variant as BannerVariants,
      }}
    >
      <div className="flex flex-col gap-x-6 md:flex-row p-5 xs:p-10 items-center justify-between w-full">
        <UniformSlot slot={slots.cookieConsentContent} />
        <div className="flex justify-between gap-2 flex-col sm:flex-row md:flex-col lg:flex-row shrink-0 md:justify-start w-full md:w-auto md:space-x-0 md:space-y-2 lg:space-y-0 lg:space-x-3 mt-4 md:mt-0">
          <BaseButton
            className="w-full cursor-pointer"
            size="button-medium"
            textSize="sm"
            textWeight="normal"
            buttonColor={allowButtonColor}
            textColor={allowTextColor}
            hoverButtonColor={allowButtonHoverColor}
            onClick={handleAllowCookiesButtonClick}
          >
            <UniformText
              placeholder="allowButtonText"
              parameter={parameters.allowButtonText as ComponentParameter<string>}
              component={component}
            />
          </BaseButton>
          <BaseButton
            className="w-full cursor-pointer"
            size="button-medium"
            textSize="sm"
            textWeight="normal"
            buttonColor={declineButtonColor}
            textColor={declineTextColor}
            hoverButtonColor={declineButtonHoverColor}
            onClick={handleDeclineCookiesButtonClick}
          >
            <UniformText
              placeholder="declineButtonText"
              parameter={parameters.declineButtonText as ComponentParameter<string>}
              component={component}
            />
          </BaseButton>
        </div>
      </div>
    </BaseBanner>
  );
};

export default withFlattenParameters(CookieConsent);
