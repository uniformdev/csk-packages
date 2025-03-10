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
### Product Recommendations System

This system provides personalized product suggestions based on user interests. It supports the following key functionalities:
- **getInterests:** Retrieves the user’s interests in a human-readable format.
- **setInterests:** Updates the user’s interests by analyzing the user's message to determine the most appropriate interest from the available options: apple, google, samsung, internet, mobilePhone, sim, watch, tablet, devices, plans, android, ios.
- **recommendProducts:** Generates personalized product recommendations whenever there is a change in the user's interest. In addition to primary recommendations, the response may include additional product suggestions based on the user's overall interests, which should be clearly highlighted as supplementary. If no recommendations are available, simply indicate that no recommendations are available without offering any additional suggestions.

### **Usage Guidelines**
- **getInterests:** Call this tool to fetch the current interests of the user in a human-readable form.
- **setInterests:** When updating interests, analyze the user's message to determine the key interest from the following list (apple, google, samsung, internet, mobilePhone, sim, watch, tablet, devices, plans, android, ios) and call this tool with that interest (only the interest text, no extra commentary).
- **recommendProducts:** Use this tool to obtain updated product recommendations after any change in user interests. The response may include both primary recommendations and additional product suggestions based on the user's overall interests. If no recommendations are available, simply indicate that no recommendations are available.

### **Best Practices**
- Always verify user interests using **getInterests** before generating recommendations.
- Update interests strictly with **setInterests** using only the key interest extracted from the user's message.
- Ensure that product recommendations from **recommendProducts** are timely, aligned with the user's latest interests, and that any additional suggestions are clearly indicated as supplementary.
`;

export const GET_INTERESTS_DESCRIPTION = 'Call this tool to retrieve the user’s interests in a human-readable format.';
export const SET_INTERESTS_DESCRIPTION =
  'Call this tool with the key interest extracted from the user’s message (only the interest text). The AI must determine the most appropriate interest from the following options: apple, google, samsung, internet, mobilePhone, sim, watch, tablet, devices, plans, android, ios.';
export const RECOMMEND_PRODUCTS_DESCRIPTION =
  'Call this tool to obtain personalized product recommendations whenever there is a change in the user’s interest. The response may include both primary recommendations and additional product suggestions based on the user’s overall interests. If no recommendations are available, simply indicate that no recommendations are available.';
