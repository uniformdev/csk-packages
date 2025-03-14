interface HubSpotForms {
  create(options: {
    region: string;
    portalId: string;
    formId: string;
    target: string;
    [key: string]: string | number | boolean | undefined;
  }): void;
}

interface HubSpot {
  forms: HubSpotForms;
}

interface Window {
  hbspt?: {
    forms?: HubSpotForms;
  };
}
