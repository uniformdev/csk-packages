import { ContentClient, flattenValues } from '@uniformdev/canvas';
import { UncachedEnrichmentClient } from '@uniformdev/context/api';
import locales from '@/i18n/locales.json';
import { AI_PROMPTS_ENTRY_SLUG } from './constants';
import { replacePromptVariables } from './utils';

const enrichmentClient = new UncachedEnrichmentClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
});

const contentClient = new ContentClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
});

const { enrichments } = await enrichmentClient.get();
const {
  entries: [promptStore],
} = await contentClient.getEntries({ slug: AI_PROMPTS_ENTRY_SLUG, locale: locales.defaultLocale });

export const getPromptsFromUniform = () => {
  if (!promptStore) throw new Error('Prompt store not found');

  const promptStoreValues = flattenValues(promptStore.entry) as { prompts?: { value: string; name: string }[] };

  if (!Array.isArray(promptStoreValues.prompts)) {
    throw new Error('Prompts are not an array');
  }

  return promptStoreValues.prompts.reduce<Record<string, string>>((acc, prompt) => {
    acc[prompt?.name || 'unknown'] = replacePromptVariables(prompt?.value || '', {
      enrichments: JSON.stringify(enrichments, null, 2),
    });
    return acc;
  }, {});
};
