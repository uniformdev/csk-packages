export const AI_PROMPTS_ENTRY_SLUG = 'ai-coffee-assistant-prompts';
export const SYSTEM_PROMPT_NAME = 'system';

export enum AI_TOOL {
  GET_USER_INTERESTS = 'getUserInterests', // To get user's interests From Uniform
  SET_USER_INTERESTS = 'setUserInterests', // To set user's interests to Uniform
  GET_RECOMMEND_PRODUCTS = 'getRecommendProducts', // To get recommend products from Uniform
  GET_CART = 'getCart', // To get user's cart
  GET_RELATED_PRODUCTS = 'getRelatedProducts', // To get related products based on the user's products in the cart
}

const AI_ASSISTANT_CONFIGURATION_PLACEHOLDER = '/:locale/ai-tools';
const SLOT_NAME = 'content';
const DYNAMIC_VARIATION_NAME = 'slugs';

// AI Assistant Configuration for User Recommendations based on Uniform Scores
const USER_RECOMMENDATIONS_COMPOSITION_SLUG = 'user-recommendations';
export const USER_RECOMMENDATIONS_COMPOSITION_PATH = `${AI_ASSISTANT_CONFIGURATION_PLACEHOLDER}/${USER_RECOMMENDATIONS_COMPOSITION_SLUG}`;
export const USER_RECOMMENDATIONS_SLOT_NAME = SLOT_NAME;

// AI Assistant Configuration for Cart
const CART_COMPOSITION_SLUG = 'see-my-cart';
export const CART_COMPOSITION_PATH = `${AI_ASSISTANT_CONFIGURATION_PLACEHOLDER}/${CART_COMPOSITION_SLUG}`;
export const CART_SLOT_NAME = SLOT_NAME;

// AI Assistant Configuration for Related Recommendations based on the user's cart
const RELATED_RECOMMENDATIONS_COMPOSITION_SLUG = 'cart-recommendations';
export const RELATED_RECOMMENDATIONS_COMPOSITION_PATH = `${AI_ASSISTANT_CONFIGURATION_PLACEHOLDER}/${RELATED_RECOMMENDATIONS_COMPOSITION_SLUG}`;
export const RELATED_RECOMMENDATIONS_SLOT_NAME = SLOT_NAME;
export const RELATED_RECOMMENDATIONS_DYNAMIC_VARIATION_NAME = DYNAMIC_VARIATION_NAME;

export const ONLY_PREVIEW_PATHS = [
  USER_RECOMMENDATIONS_COMPOSITION_PATH,
  CART_COMPOSITION_PATH,
  RELATED_RECOMMENDATIONS_COMPOSITION_PATH,
];
