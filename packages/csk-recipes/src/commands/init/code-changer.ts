import fs from 'fs/promises';
import MetaScript from 'metascript';
import path from 'path';
import { JSX_COMMENT_REGEX } from './constants';
import { EnvVariable, Recipe } from './types';
import { formatWithPrettier, runCmdCommand } from '../../utils';

/**
 * Filters out skipped lines and formats the cleaned output code.
 *
 * @param {Line[]} lines - The lines of code with metadata.
 * @returns {string} - The cleaned source code.
 */
const cleanOutput = async (source: string, fileExtension: string): Promise<string> => {
  const getParser = () => {
    if (fileExtension === '.json') {
      return 'json';
    }
    return 'typescript';
  };

  return formatWithPrettier(source, { parser: getParser() });
};

/**
 * Processes a file by transforming its content based on the provided recipes,
 * cleaning the output, and optionally running a linter for non-JSON files.
 *
 * @param {string} filePath - The path to the file to process.
 * @param {Recipe[]} recipes - The list of recipes to enable in the transformation.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export const proceedCodeChange = async (filePath: string, recipes: Recipe[]): Promise<void> => {
  const sourceCode = await fs.readFile(filePath, 'utf8');

  // Replace JSX-style comments with JavaScript comments for MetaScript compatibility
  const updatedContent = sourceCode.replace(JSX_COMMENT_REGEX, (_, content) => `//? ${content.trim()}`);

  const metaProgram = MetaScript.compile(updatedContent);

  const isLocalizationEnabled = recipes.includes('localization');
  const isGAEnabled = recipes.includes('ga');
  const isUniformInsightsEnabled = recipes.includes('uniform-insights');

  const transformedCode = new MetaScript(metaProgram).transform({
    localization: isLocalizationEnabled,
    ga: isGAEnabled,
    uniformInsights: isUniformInsightsEnabled,
  });

  const fileExtension = path.extname(filePath);

  const codeAfterCleanup = await cleanOutput(transformedCode, fileExtension);

  if (!codeAfterCleanup) {
    await fs.rm(filePath);
  } else {
    await fs.writeFile(filePath, codeAfterCleanup);

    if (fileExtension !== '.json') {
      await runCmdCommand(`npx next lint --file ${filePath} --fix`);
    }
  }
};

export const addEnvVariablesToProjectConfiguration = async (envVariables: Partial<Record<EnvVariable, string>>) => {
  const envVariablesString = Object.entries(envVariables)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  await fs.writeFile('.env', envVariablesString);
};
