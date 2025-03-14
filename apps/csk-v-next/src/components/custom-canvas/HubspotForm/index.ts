import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';

export { default } from './hubspot-form';

export type HubspotFormParameters = {
  formId: string;
  countOfVirtualFields?: number;
  backgroundColor: string;
};

export type HubspotFormProps = ComponentProps<HubspotFormParameters>;
