/**
 * All-in-one translation runner
 * Reads entry JSON files, finds fields to translate, and translates them to all locales using OpenAI
 */

import dotenv from 'dotenv';
import fs from 'fs/promises';
import { OpenAI } from 'openai';
import path from 'path';

dotenv.config();

// =============== SETUP ===============

const ENTRY_PATH = './content-json/entry'; // Folder with JSON entries
const ORIGINAL_LOCALE = 'en-us';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// =============== TYPES ===============

type FieldType = 'text' | 'richText';

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
    },
  },
};

// =============== PROMPT BUILDERS ===============

function buildTextPrompt(text: string, description: string, contentType: string, locale: string): string {
  return `You are a professional translator.

Please translate the following text into ${locale}:

${text}

Field description: ${description}
Content type: ${contentType}

Return only the translated text. Do not include any extra comments. Be faithful to the original meaning.`;
}

function buildRichTextPrompt(text: string, description: string, contentType: string, locale: string): string {
  return `You are a professional translator.

This is a JSON Rich Text object. Translate **all text** into ${locale}, keeping the original JSON structure exactly the same:

${text}

Field description: ${description}
Content type: ${contentType}

Return only the translated JSON object. Do not add any extra comments or change the structure.`;
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
      ? buildRichTextPrompt(text, description, entryType, locale)
      : buildTextPrompt(text, description, entryType, locale);

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    return res.choices[0]?.message?.content?.trim() ?? text;
  } catch (error) {
    console.error(`❌ OpenAI error for locale "${locale}":`, error);
    return text;
  }
}

// =============== MAIN PROCESSING FUNCTION ===============

async function processEntryFile(entryFile: string) {
  const entryJsonPath = path.join(ENTRY_PATH, entryFile);
  const raw = await fs.readFile(entryJsonPath, 'utf8');
  const data = JSON.parse(raw);

  if (!data?.entry || !data.entry.fields) {
    console.warn(`⚠️ Skipping ${entryFile}: No entry.fields found`);
    return;
  }

  const entryType = data.entry.type;
  const entryConfig = TRANSLATION_CONFIG[entryType];
  if (!entryConfig) {
    console.warn(`⚠️ Skipping ${entryFile}: No config for entry type "${entryType}"`);
    return;
  }

  const fields = data.entry.fields;
  const updatedFields = { ...fields };

  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    const fieldConfig = entryConfig.fields[fieldName];
    if (!fieldConfig) continue; // Not in translation config

    const locales = (fieldValue as { locales?: Record<string, string> })?.locales;
    if (!locales || !locales[ORIGINAL_LOCALE]) {
      console.warn(`⚠️ No "${ORIGINAL_LOCALE}" value for field "${fieldName}" in ${entryFile}`);
      continue;
    }

    const sourceText = locales[ORIGINAL_LOCALE];
    const targetLocales = Object.keys(locales).filter(l => l !== ORIGINAL_LOCALE);

    for (const targetLocale of targetLocales) {
      console.info(`🌐 Translating [${entryType}.${fieldName}] for locale: ${targetLocale}`);
      const translated = await translate(sourceText, entryType, fieldName, targetLocale);
      updatedFields[fieldName].locales[targetLocale] = translated;
    }
  }

  const updatedEntry = {
    ...data,
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
      if (file !== '2f042be4-1e8b-4fae-be0e-a5294b89d8dd.json') {
        continue;
      }

      if (file.endsWith('.json')) {
        await processEntryFile(file);
      }
    }
  } catch (error) {
    console.error('❌ Error running translation processor:', error);
  }
}

run();
