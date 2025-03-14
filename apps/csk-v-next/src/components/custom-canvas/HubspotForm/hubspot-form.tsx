'use client';
import { FC, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { HubspotFormProps } from '.';
import HubspotScript from './hubspot-script';
import styles from './HubspotForm.module.scss';

const isClient = typeof window !== 'undefined';

const HubSpotForm: FC<HubspotFormProps> = ({ formId, countOfVirtualFields, backgroundColor }) => {
  const [isLoaded, setIsLoaded] = useState(Boolean(isClient && window.hbspt?.forms));
  const backgroundColorClass = `bg-${backgroundColor}`;

  const targetFormId = `formId-${formId}`;

  useEffect(() => {
    if (!isLoaded) return;

    if (!process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID) {
      throw new Error('NEXT_PUBLIC_HUBSPOT_PORTAL_ID is not set');
    }

    window.hbspt?.forms?.create({
      region: 'na1',
      portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
      formId: formId,
      target: `#${targetFormId}`,
    });
  }, [isLoaded, formId, targetFormId]);

  const onScriptLoaded = useCallback(() => setIsLoaded(true), []);

  return (
    <>
      {!process.env.NEXT_PUBLIC_E2E_TEST && <HubspotScript onLoad={onScriptLoaded} />}
      <div id={targetFormId} className={styles.Form}>
        <div className={classNames({ 'animate-pulse': !process.env.NEXT_PUBLIC_E2E_TEST })}>
          {[...Array(Number(countOfVirtualFields) || 1).keys()].map((item, index: number) => (
            <div
              key={item}
              className={classNames('pt-[22px] pb-[16px]', { '!pb-0': Number(countOfVirtualFields) - 1 === index })}
            >
              <div className={classNames('h-11', backgroundColorClass)} />
            </div>
          ))}
          <div className="pb-8 pt-4">
            <div className={classNames('h-2 mb-[11px]', backgroundColorClass)} />
            <div className={classNames('h-2 mb-[11px]', backgroundColorClass)} />
            <div className={classNames('h-2', backgroundColorClass)} />
          </div>

          <div className={classNames('h-[61px]', backgroundColorClass)} />
        </div>
      </div>
    </>
  );
};

export default HubSpotForm;
