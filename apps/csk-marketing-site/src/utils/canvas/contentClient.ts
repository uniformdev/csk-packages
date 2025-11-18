import { ContentClient, flattenValues } from '@uniformdev/canvas';
import { RecipeItem } from '@/components/custom-canvas/RecipeList';

export const getContentClient = () =>
  new ContentClient({
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL || 'https://canary.uniform.app',
    projectId: process.env.UNIFORM_PROJECT_ID,
    edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL || 'https://canary.uniform.global',
  });

export const getRecipesByCategory = async ({
  categoryId,
}: {
  categoryId?: string;
} = {}) => {
  const filters = {
    type: { eq: 'recipe' },
    ...(categoryId ? { 'fields.categories[eq]': categoryId } : null),
  };
  return getContentClient()
    .getEntries({
      filters,
      orderBy: ['created_at_DESC'],
    })
    .then(response =>
      response.entries.map(item => {
        return { slug: item.entry._slug ?? '', id: item.entry._id, ...flattenValues(item.entry) } as RecipeItem;
      })
    );
};
