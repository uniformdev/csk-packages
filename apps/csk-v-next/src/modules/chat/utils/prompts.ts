import { flattenValues } from '@uniformdev/canvas';

import { AI_PROMPTS_ENTRY_SLUG } from '../constants';
import { contentClient, enrichmentClient } from './uniformClients';

const { enrichments } = await enrichmentClient.get();
const {
  entries: [promptStore],
} = await contentClient.getEntries({ slug: AI_PROMPTS_ENTRY_SLUG });

const replacePromptVariables = (template: string, values: Record<string, string>, fallback = ''): string =>
  template.replace(/{{(.*?)}}/g, (_, key) => (key in values ? values[key] : fallback));

// Get prompts from Uniform
export const getPromptsFromUniform = () => {
  if (!promptStore) throw new Error('Prompt store not found');

  const promptStoreValues = flattenValues(promptStore.entry) as { prompts?: { value: string; name: string }[] };

  if (!Array.isArray(promptStoreValues.prompts)) {
    throw new Error('Prompts are not an array');
  }

  // Replace variables in prompts (for example, {{enrichments}})
  return promptStoreValues.prompts.reduce<Record<string, string>>((acc, prompt) => {
    acc[prompt?.name || 'unknown'] = replacePromptVariables(prompt?.value || '', {
      enrichments: JSON.stringify(enrichments, null, 2),
    });
    return acc;
  }, {});
};
