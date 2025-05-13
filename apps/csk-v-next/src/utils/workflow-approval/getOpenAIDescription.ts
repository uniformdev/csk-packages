'use server';

import { createPatch } from 'diff';
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import getCompositionByVersionId from '@/utils/getCompositionByVersionId';

const askOpenAI = async (patch: string) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a content change analyzer specialized in analyzing JSON diffs. Your task is to identify and clearly describe meaningful content changes from a user perspective, while ignoring technical implementation details.

Focus on:
	•	Changes in text content and user-facing messages
	•	New or removed sections, pages, or content blocks
	•	Changes in navigation structure or menu items
	•	Updates to metadata directly visible to users (titles, descriptions, SEO-relevant content)
	•	Changes in visible links and URLs
	•	Modifications to images, media, or embedded content
	•	Changes in user-visible business logic or functionality (e.g., form behavior, content visibility rules)

Ignore:
	•	JSON structure, formatting, and rich text markup
	•	Whitespace, indentation, and visual styling details
	•	Internal IDs, references, and system-generated fields
	•	Metadata that doesn't affect visible content or SEO
	•	Version numbers, timestamps, and backend configuration details

Output Format:
	•	Use clear, concise language understandable by non-technical stakeholders.
	•	Limit your description to up to 5 sentences or 5 bullet points.
	•	If many changes occurred, prioritize the top 5 most impactful for users.
	•	Do not include personal interpretations, conclusions, or opinions—state only objective facts about what changed.`,
        },
        {
          role: 'user',
          content: `Please analyze these content changes and describe the meaningful updates in up to 5 sentences:\n\n${patch}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
};

type GetOpenAIDescriptionProps = {
  compositionId: string;
  latestVersionId: string;
  latestPublishedVersionId: string;
};

const getOpenAIDescription = async ({
  compositionId,
  latestVersionId,
  latestPublishedVersionId,
}: GetOpenAIDescriptionProps) => {
  const [draftVersion, publishedVersion] = await Promise.all([
    getCompositionByVersionId({
      compositionId,
      versionId: latestVersionId,
      state: CANVAS_DRAFT_STATE,
      locale: 'en',
    }),
    getCompositionByVersionId({
      compositionId,
      versionId: latestPublishedVersionId,
      state: CANVAS_PUBLISHED_STATE,
      locale: 'en',
    }),
  ]);

  console.info('Creating diff...');
  const patch = createPatch(
    'diff',
    JSON.stringify(publishedVersion, null, 2),
    JSON.stringify(draftVersion, null, 2),
    'Published Version',
    'Draft Version',
    {
      ignoreWhitespace: true,
      ignoreNewlineAtEof: true,
    }
  );

  console.info('Getting OpenAI description...');
  let changesDescription;
  try {
    changesDescription = await askOpenAI(patch);
  } catch (error) {
    console.error('Error getting OpenAI description:', error);
    changesDescription = 'Unable to generate changes description. Please review the diff manually.';
  }

  return changesDescription;
};

export default getOpenAIDescription;
