import {
  BRAND_ENRICHMENT_KEY,
  DEVICE_ENRICHMENT_KEY,
  INTEREST_ENRICHMENT_KEY,
  PLATFORM_ENRICHMENT_KEY,
} from '@/chat/constants';

export type EnrichmentKeys = readonly [
  typeof BRAND_ENRICHMENT_KEY,
  typeof DEVICE_ENRICHMENT_KEY,
  typeof INTEREST_ENRICHMENT_KEY,
  typeof PLATFORM_ENRICHMENT_KEY,
];

export const converter: Record<EnrichmentKeys[number], (values: string[]) => string> = {
  [BRAND_ENRICHMENT_KEY]: values => `I like the brands ${values.join(', ')}.`,
  [DEVICE_ENRICHMENT_KEY]: values => `I like the devices ${values.join(', ')}.`,
  [INTEREST_ENRICHMENT_KEY]: values => `I am interested in ${values.join(', ')}.`,
  [PLATFORM_ENRICHMENT_KEY]: values => `I like the platforms ${values.join(', ')}.`,
};
