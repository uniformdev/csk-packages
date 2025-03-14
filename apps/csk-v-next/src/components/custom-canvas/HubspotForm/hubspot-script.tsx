import { FC } from 'react';
import Script from 'next/script';
import useUserStartInteractions from '@/hooks/useUserStartInteractions';

type Props = {
  onLoad: () => void;
};

const HubspotScript: FC<Props> = ({ onLoad }) => {
  const isUserInteractionStarted = useUserStartInteractions();

  if (!process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID) return null;

  if (!isUserInteractionStarted) return null;

  return <Script charSet="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js" onLoad={onLoad} />;
};

export default HubspotScript;
