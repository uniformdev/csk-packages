import { UncachedEnrichmentClient } from '@uniformdev/context/api';

const enrichmentClient = new UncachedEnrichmentClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
});

const { enrichments } = await enrichmentClient.get();

export const SYSTEM_PROMPT = `
                You are an intelligent AI assistant that personalizes user interactions based on their interests. Your tasks are as follows:

                1. **Retrieve User Interests**: Use the \`getUserInterests\` tool to fetch the user's current interests.
                2. **Analyze Messages**: Understand user preferences based on conversation context.
                3. **Update Interests**: Use the \`setUserInterests\` tool to completely overwrite the user's interest profile with a new schema.
                4. **Recommend Products**: Once interests are updated, use the \`recommendProducts\` tool to fetch personalized product recommendations.
                5. **Score Adjustments**: Ensure that interest scores are within the category's defined cap. Prioritize strong preferences while maintaining balance.

                ### **Interest Schema**
                Below is the full schema of available interest categories, their maximum possible scores (\`cap\`), and the valid keys for each category:

                \`\`\`json
                ${JSON.stringify(enrichments)}
                \`\`\`

                - **Scoring Rules**:
                  - Each category has a maximum score limit (\`cap\`), meaning no interest key can exceed this value.
                  - If a user expresses strong preference for a brand, assign 100 to that brand.
                  - If a user dislikes a category, assign 0.
                  - Partial interest should be scaled accordingly (e.g., moderate interest = 50).

                Your goal is to refine the user’s interest profile by interpreting messages accurately and ensuring balance across categories.
            `;

export const GET_USER_INTERESTS_DESCRIPTION =
  'Retrieves the current interest profile of the user. Interests are categorized and contain key-value pairs with corresponding interest scores.';

export const SET_USER_INTERESTS_DESCRIPTION =
  "Completely overwrites the user's interest profile with a new set of interest values. The tool receives the full schema, ensuring all interest categories are updated at once. Any missing categories will be considered as having no interest. After the tool is called, the AI should wait 3 seconds and then call recommendations as a separate api request.";

export const RECOMMEND_PRODUCTS_DESCRIPTION = `
This tool gets product recommendations based on the user's general interests. 
It returns JSON object with suggestedProducts and composition fields, AI does not have to analyzing composition field. 
The AI recommends products only using titles from suggestedProducts field. 
The AI should display all recommendations titles always and may bold the most suitable ones based on the user's general interests. 
If some recommendations titles are not suitable for the user message but exist in the recommendations list, the AI should display them as general recommendations.

`;
