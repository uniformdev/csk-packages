import { flattenValues } from '@uniformdev/canvas';

import { AI_PROMPTS_ENTRY_SLUG } from '../constants';
import { contentClient, enrichmentClient } from './uniformClients';

// Extract type from enrichmentClient.get() return value
type EnrichmentClientReturnType = Awaited<ReturnType<typeof enrichmentClient.get>>;
type EnrichmentType = EnrichmentClientReturnType['enrichments'][number];

const generateEnrichmentExamples = (data: EnrichmentType[]): string =>
  data
    .flatMap(({ id: cat, name, cap, values }) =>
      values.map(
        ({ id: key, value }) =>
          `{ cat: '${cat}', key: '${key}', str: ${cap} } // ${name} category with ${value} value, max_for_this_category enrichment score: ${cap}`
      )
    )
    .join(',\n');

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
      enrichments: generateEnrichmentExamples(enrichments),
    });
    return acc;
  }, {});
};
