import enrichments from './enrichments.json';
import { mapValuesToString } from './utils';

export const BRAND_ENRICHMENT_KEY = 'brand';
export const DEVICE_ENRICHMENT_KEY = 'device';
export const INTEREST_ENRICHMENT_KEY = 'interest';
export const PLATFORM_ENRICHMENT_KEY = 'platform';

export const EnrichmentKeys = [
  BRAND_ENRICHMENT_KEY,
  DEVICE_ENRICHMENT_KEY,
  INTEREST_ENRICHMENT_KEY,
  PLATFORM_ENRICHMENT_KEY,
] as const;

export const RECOMMENDATIONS_COMPOSITION_SLUG = 'product-recommendations';
export const SUGGESTIONS_SLOT_NAME = 'recommendations';
export const PRODUCT_RECOMMENDATION_TYPE = 'productRecommendation';
export const PRODUCT_RECOMMENDATIONS_SLOT_NAME = 'products';

export const AUTO_PROMPT = 'Quietly request my interests and greet me with some products I might be interested in.';

export const MAX_STEPS = 5;

export const SYSTEM_PROMPT = `
You are an AI assistant that helps users see product recommendations. 
Your job is to work with user interests. Use the tools to get the current interests, update them when needed, and then show product recommendations. 
The AI recommends products only based on the response from recommendProducts. 
When the user shares his interests or expresses that he is looking for something, after setting the interest, call recommendProducts and display the message based on its response. 
Remember that users can change their interests at any time, and that will expand the list of recommendations.
  `;

export const GET_INTERESTS_DESCRIPTION = `
This tool is used to get the user's current interests. No extra information is needed.
`;

export const SET_INTERESTS_DESCRIPTION = `
This tool updates the user's interests based on a new message. 
When processing the message, extract one or more interests and list them separated by commas. 
The available interests for setting are: ${mapValuesToString(enrichments)}. 
After the tool is called, the AI should wait 3 seconds and then call recommendations as a separate api request.
`;

export const RECOMMEND_PRODUCTS_DESCRIPTION = `
This tool gets product recommendations using the general user's interests. 
It returns product titles, which are shown to the user as product cards. 
The AI recommends products only based on the response from this tool. 
The AI should display all recommendations titles always and may bold the most suitable ones based on the user's general interests. 
If some recommendations titles are not suitable for the user message but exist in the recommendations list, the AI should display them as general recommendations.
`;
