import { ProductBoostEnrichment, PersonalizationSupportedEntryType } from './types';

export const COFFEE_BEANS = 'beans';
export const COFFEE_MAKERS = 'coffee-makers';
export const EVERYONE = 'everyone';

export const PERSONALIZATION_SUPPORTED_ENTRY_TYPES = ['product'] as const;

export const BOOST_ENRICHMENT_BY_TYPE: Record<
  PersonalizationSupportedEntryType,
  Record<ProductBoostEnrichment, string[]>
> = {
  product: {
    int: [COFFEE_BEANS, COFFEE_MAKERS, EVERYONE],
  },
};

export const ENRICHMENT_ENTRY_FIELD = {
  product: {
    int: 'interest',
  },
};

export const ORDER_BY_CLAUSES: Record<
  PersonalizationSupportedEntryType,
  Record<ProductBoostEnrichment, Record<string, string>>
> = {
  product: {
    int: {
      [COFFEE_BEANS]: `boost|fields.${ENRICHMENT_ENTRY_FIELD['product']['int']}:${COFFEE_BEANS}:3|fields.${ENRICHMENT_ENTRY_FIELD['product']['int']}:${EVERYONE}:2_DSC`,
      [COFFEE_MAKERS]: `boost|fields.${ENRICHMENT_ENTRY_FIELD['product']['int']}:${COFFEE_MAKERS}:3|fields.${ENRICHMENT_ENTRY_FIELD['product']['int']}:${EVERYONE}:2_DSC`,
    },
  },
};

export const BOOST_ENRICHMENT_VALUES = ['int'] as const;
