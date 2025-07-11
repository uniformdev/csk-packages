/**
 * All-in-one translation runner
 * Reads entry JSON files, normalizes missing en-us locales,
 * ensures all target locales exist using OpenAI translations,
 * and handles nested $block structures recursively.
 */

import dotenv from 'dotenv';
import fs from 'fs/promises';
import { OpenAI } from 'openai';
import path from 'path';

dotenv.config();

// =============== SETUP ===============

const ENTRY_PATH = './content-json/entry';
const ORIGINAL_LOCALE = 'en-us';

const TARGET_LOCALES = [
  'en-us',
  'es-us',
  'fr-ca',
  'en-ca',
  'en-gb',
  'de-de',
  'en-de',
  'de-at',
  'nl-nl',
  'en-nl',
  'da-dk',
  'sv-se',
  'nb-no',
  'fr-fr',
  'en-fr',
  'ja-jp',
  'ar-uae',
  'ar-ksa',
];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// =============== TYPES ===============

type FieldType = 'text' | 'richText' | '$block';

interface FieldConfig {
  description: string;
  type: FieldType;
}

interface EntryTypeConfig {
  fields: Record<string, FieldConfig>;
}

type TranslationConfig = Record<string, EntryTypeConfig>;

// =============== TRANSLATION CONFIG ===============

const TRANSLATION_CONFIG: TranslationConfig = {
  product: {
    fields: {
      title: {
        description: 'Title of the product entry (shown in listings or internal references).',
        type: 'text',
      },
      name: {
        description: 'Name of the product as displayed to customers.',
        type: 'text',
      },
      shortDescription: {
        description: 'Short marketing description for the product (multiline text).',
        type: 'text',
      },
      body: {
        description: 'Detailed Rich Text body content describing the product.',
        type: 'richText',
      },
      metaTitle: {
        description: 'SEO meta title for the product page.',
        type: 'text',
      },
      metaDescription: {
        description: 'SEO meta description for the product page.',
        type: 'text',
      },
      variants: {
        description: 'Product variants (block of nested fields).',
        type: '$block',
      },
    },
  },
};

// =============== PROMPT BUILDERS ===============

function buildTextPrompt(text: string, description: string, contentType: string, locale: string): string {
  return `You are a professional translator. The original text is in en-us language.

Please translate the following text into ${locale}:

${text}

Field description: ${description}
Content type: ${contentType}

Return only the translated text. Do not include any extra comments. Be faithful to the original meaning.`;
}

function buildRichTextPrompt(text: string, description: string, contentType: string, locale: string): string {
  return `You are a professional translator.

You will receive a JSON Rich Text object in en-us. Your task is to translate all human-readable text into ${locale}, while keeping the JSON structure 100% identical.

Below is the JSON:

${text}

Instructions:
- Return ONLY the translated JSON object.
- Do NOT include any code fences, headers, or Markdown.
- Do NOT add any comments or explanations.
- The output MUST be valid JSON that starts with '{' and ends with '}'.
`;
}

// =============== TRANSLATE FUNCTION ===============

async function translate(text: string, entryType: string, fieldName: string, locale: string): Promise<string> {
  const entryConfig = TRANSLATION_CONFIG[entryType];
  if (!entryConfig) {
    console.warn(`⚠️ No config for entry type "${entryType}". Returning original text.`);
    return text;
  }

  const fieldConfig = entryConfig.fields[fieldName];
  if (!fieldConfig) {
    console.warn(`⚠️ No config for field "${fieldName}" in type "${entryType}". Returning original text.`);
    return text;
  }

  const { description, type } = fieldConfig;

  const prompt =
    type === 'richText'
      ? buildRichTextPrompt(JSON.stringify(text), description, entryType, locale)
      : buildTextPrompt(text, description, entryType, locale);

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const result = res.choices[0]?.message?.content?.trim() ?? text;

    if (type === 'richText') {
      return JSON.parse(result);
    }

    return result;
  } catch (error) {
    console.error(`❌ OpenAI error for locale "${locale}":`, error);
    return text;
  }
}

// =============== RECURSIVE FIELD PROCESSOR ===============

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function processTranslatableFields(fields: Record<string, any>, entryType: string): Promise<void> {
  const entryConfig = TRANSLATION_CONFIG[entryType];
  if (!entryConfig) return;

  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    const fieldConfig = entryConfig.fields[fieldName];
    if (!fieldConfig) continue;

    if (!fieldValue || typeof fieldValue !== 'object') continue;

    if (fieldConfig.type === '$block') {
      // Process nested blocks
      if (Array.isArray(fieldValue.value)) {
        for (const item of fieldValue.value) {
          if (item.fields) {
            await processTranslatableFields(item.fields, entryType);
          }
        }
      }
      continue;
    }

    // Normalize old "value" to "locales.en-us"
    if ('value' in fieldValue || 'locales' in fieldValue) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const obj = fieldValue as Record<string, any>;

      if (!obj.locales) {
        obj.locales = {};
      }

      if (!obj.locales[ORIGINAL_LOCALE] && obj.value) {
        console.info(`🛠️ Normalizing "${fieldName}": moving "value" to "locales.en-us"`);
        obj.locales[ORIGINAL_LOCALE] = obj.value;
        delete obj.value;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const locales = obj.locales as Record<string, any>;
      if (!locales?.[ORIGINAL_LOCALE]) {
        console.warn(`⚠️ No "${ORIGINAL_LOCALE}" for field "${fieldName}"`);
        continue;
      }

      const sourceText = locales[ORIGINAL_LOCALE];

      for (const targetLocale of TARGET_LOCALES) {
        if (targetLocale === ORIGINAL_LOCALE) continue;
        console.info(`🌐 Translating [${entryType}.${fieldName}] → ${targetLocale}`);
        locales[targetLocale] = await translate(sourceText, entryType, fieldName, targetLocale);
      }
    }
  }
}

// =============== MAIN PROCESSING FUNCTION ===============

async function processEntryFile(entryFile: string) {
  const entryJsonPath = path.join(ENTRY_PATH, entryFile);
  const raw = await fs.readFile(entryJsonPath, 'utf8');
  const data = JSON.parse(raw);

  if (data.translated) {
    console.info(`✅ Skipping ${entryFile}: Already translated \n\n\n\r`);
    return;
  }

  if (!data?.entry || !data.entry.fields) {
    console.warn(`⚠️ Skipping ${entryFile}: No entry.fields found  \n\n\n\r`);
    return;
  }

  const entryType = data.entry.type;
  const entryConfig = TRANSLATION_CONFIG[entryType];
  if (!entryConfig) {
    console.warn(`⚠️ Skipping ${entryFile}: No config for entry type "${entryType}"  \n\n\n\r`);
    return;
  }

  const updatedFields = { ...data.entry.fields };

  await processTranslatableFields(updatedFields, entryType);

  const updatedEntry = {
    ...data,
    translated: true,
    entry: {
      ...data.entry,
      fields: updatedFields,
    },
  };

  await fs.writeFile(entryJsonPath, JSON.stringify(updatedEntry, null, 2));
  console.info(`✅ Updated translations for ${entryFile}`);
}

// =============== RUNNER ===============

async function run() {
  try {
    const files = await fs.readdir(ENTRY_PATH);
    for (const file of files) {
      if (file.endsWith('.json')) {
        await processEntryFile(file);
      }
    }
  } catch (error) {
    console.error('❌ Error running translation processor:', error);
  }
}

run();
