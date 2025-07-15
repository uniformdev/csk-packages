/**
 * Composition Translator
 *
 * Recursively translates all "text" and "richText" parameters in Uniform composition JSON files.
 * Ensures all target locales are filled, normalizing "value" to "locales.en-us" if needed.
 * Handles deeply nested parameters, slots, and _overrides.
 */

import dotenv from 'dotenv';
import fs from 'fs/promises';
import { OpenAI } from 'openai';
import path from 'path';

dotenv.config();

// ==================== CONFIG ====================

const COMPOSITION_PATH = './content-json/composition';
const COMPONENT_PATTERNS_PATH = './content-json/componentPattern';
const COMPOSITION_PATTERNS_PATH = './content-json/compositionPattern';
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

// ==================== TYPES ====================

type LocalesMap = Record<string, string>;

type TranslatableParam = {
  type: 'text' | 'richText';
  locales?: LocalesMap;
  value?: string;
};

type ParameterValue = TranslatableParam | ParameterObject | ParameterArray;

type ParameterObject = {
  [key: string]: ParameterValue;
};

type ParameterArray = ParameterValue[];

type CompositionNode = {
  parameters?: ParameterObject;
  slots?: Record<string, CompositionNode[]>;
  _overrides?: Record<string, CompositionNode>;
};

// ==================== PROMPT BUILDERS ====================

function buildTextPrompt(text: string, locale: string): string {
  return `You are a professional translator. The original text is in en-us language.

Please translate the following text into ${locale}:

${text}

Instructions:
- Return only the translated text.
- Do not include any extra comments.
- Be faithful to the original meaning.`;
}

function buildRichTextPrompt(text: string, locale: string): string {
  return `You are a professional translator.

You will receive a JSON Rich Text object in en-us. Your task is to translate all human-readable text into ${locale}, while keeping the JSON structure 100% identical.

Below is the JSON:

${text}

Instructions:
- Return ONLY the translated JSON object.
- Do NOT include any code fences, headers, or Markdown.
- Do NOT add any comments or explanations.
- The output MUST be valid JSON that starts with '{' and ends with '}'.`;
}

// ==================== TRANSLATION ====================

async function translateText(text: string, type: string, locale: string): Promise<string> {
  const prompt =
    type === 'richText' ? buildRichTextPrompt(JSON.stringify(text), locale) : buildTextPrompt(text, locale);

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

// ==================== TYPE GUARDS ====================

function isTranslatableParam(param: ParameterValue): param is TranslatableParam {
  return (
    typeof param === 'object' &&
    ((param as TranslatableParam).type === 'text' || (param as TranslatableParam).type === 'richText')
  );
}

// ==================== PARAMETER PROCESSING ====================

async function processTranslatableParam(param: TranslatableParam): Promise<void> {
  if (!param.locales) {
    param.locales = {};
  }

  if (param.value && !param.locales[ORIGINAL_LOCALE]) {
    console.info(`🛠️ Normalizing: moving "value" to "locales.en-us"`);
    param.locales[ORIGINAL_LOCALE] = param.value;
    delete param.value;
  }

  if (!param.locales?.[ORIGINAL_LOCALE]) {
    console.warn(`⚠️ No "${ORIGINAL_LOCALE}" in param, skipping`);
    return;
  }

  const sourceText = param.locales[ORIGINAL_LOCALE];

  if (typeof sourceText !== 'string' && typeof sourceText !== 'object') {
    console.warn(`⚠️ Skipping non-string/non-object sourceText`);
    return;
  }

  if (typeof sourceText === 'string' && sourceText.includes('${#jptr')) {
    console.info(`⏩ Skipping because it contains JPTR`);
    for (const targetLocale of TARGET_LOCALES) {
      if (targetLocale === ORIGINAL_LOCALE) continue;

      param.locales[targetLocale] = sourceText;
    }
    return;
  }

  for (const targetLocale of TARGET_LOCALES) {
    if (targetLocale === ORIGINAL_LOCALE) continue;

    console.info(`🌐 Translating [${param.type}] → ${targetLocale}`);
    param.locales[targetLocale] = await translateText(sourceText, param.type, targetLocale);
  }
}

async function processParameterValue(param: ParameterValue): Promise<void> {
  if (!param || typeof param !== 'object') return;

  if (isTranslatableParam(param)) {
    await processTranslatableParam(param);
    return;
  }

  // @ts-expect-error - param.type is not defined in the type ParameterValue
  if (param.type === 'asset') {
    return;
  }

  if (Array.isArray(param)) {
    for (const item of param) {
      await processParameterValue(item);
    }
    return;
  }

  for (const value of Object.values(param)) {
    await processParameterValue(value);
  }
}

// ==================== NODE PROCESSING ====================

async function processCompositionNode(node: CompositionNode): Promise<void> {
  if (!node) return;

  if (node.parameters) {
    for (const param of Object.values(node.parameters)) {
      await processParameterValue(param);
    }
  }

  if (node.slots) {
    for (const slotItems of Object.values(node.slots)) {
      for (const child of slotItems) {
        await processCompositionNode(child);
      }
    }
  }

  if (node._overrides) {
    for (const override of Object.values(node._overrides)) {
      await processCompositionNode(override);
    }
  }
}

// ==================== FILE PROCESSING ====================

async function processCompositionFile(filePath: string) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(raw);

    if (!data?.composition) {
      console.warn(`⚠️ Skipping ${filePath}: No "composition" found`);
      return;
    }

    console.info(`🔍 Processing composition in ${path.basename(filePath)}`);

    await processCompositionNode(data.composition);

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.info(`✅ Updated composition translations for ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`❌ Error processing file "${filePath}":`, error);
  }
}

// ==================== MAIN RUNNER ====================

async function run() {
  try {
    const files = await fs.readdir(COMPOSITION_PATTERNS_PATH);

    for (const file of files) {
      if (file.endsWith('.json')) {
        await processCompositionFile(path.join(COMPOSITION_PATTERNS_PATH, file));
      }
    }
  } catch (error) {
    console.error('❌ Error running composition translator:', error);
  }
}

run();
