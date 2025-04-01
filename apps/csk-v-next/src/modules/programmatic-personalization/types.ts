import { BOOST_ENRICHMENT_VALUES, PERSONALIZATION_SUPPORTED_ENTRY_TYPES } from './constants';

export type ProductBoostEnrichment = (typeof BOOST_ENRICHMENT_VALUES)[number];
export type PersonalizationSupportedEntryType = (typeof PERSONALIZATION_SUPPORTED_ENTRY_TYPES)[number];
