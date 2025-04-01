const COFFEE_BEANS = 'beans';
const COFFEE_MAKERS = 'coffee-makers';
export const EVERYONE = 'everyone';

export const BOOST_ENRICHMENT_BY_TYPE = {
  product: {
    int: [COFFEE_BEANS, COFFEE_MAKERS, EVERYONE],
  },
};

export const ENRICHMENT_ENTRY_FIELD = {
  product: {
    int: 'interest',
  },
};

export const ORDER_BY_CLAUSES: Record<string, Record<ProductBoostEnrichment, Record<string, string>>> = {
  product: {
    int: {
      [COFFEE_BEANS]: `boost|fields.${ENRICHMENT_ENTRY_FIELD['product']['int']}:${COFFEE_BEANS}:3|fields.${ENRICHMENT_ENTRY_FIELD['product']['int']}:${EVERYONE}:2_DSC`,
      [COFFEE_MAKERS]: `boost|fields.${ENRICHMENT_ENTRY_FIELD['product']['int']}:${COFFEE_MAKERS}:3|fields.${ENRICHMENT_ENTRY_FIELD['product']['int']}:${EVERYONE}:2_DSC`,
    },
  },
};

export type ProductBoostEnrichment = 'int';
