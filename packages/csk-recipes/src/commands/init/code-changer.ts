import fsSync from 'fs';
import fs from 'fs/promises';
import path from 'path';
import MetaScript from '@uniformdev/metascript';
import {
  FILES_TO_IGNORE_OUTSIDE_OF_MONOREPO,
  JSX_COMMENT_REGEX,
  META_NOT_PROCESABLE_FILE_PATH_SEGMENTS,
  PACKAGE_JSON_COPY_FILE,
  RECIPE_ADDITIONAL_FILES,
} from './constants';
import { EnvVariable, Recipe } from './types';
import { formatWithPrettier, runCmdCommand } from '../../utils';

/**
 * Filters out skipped lines and formats the cleaned output code.
 *
 * @param {string} source - The source code to clean and format
 * @param {string} fileExtension - The extension of the file being processed (e.g., '.ts', '.json', '.css')
 * @returns {Promise<string>} The cleaned and formatted source code
 */
const cleanOutput = async (source: string, fileExtension: string): Promise<string> => {
  const getParser = () => {
    switch (fileExtension) {
      case '.json':
        return 'json';
      case '.css':
        return 'css';
      default:
        return 'typescript';
    }
  };

  return formatWithPrettier(source, { parser: getParser() });
};

/**
 * Processes a file by transforming its content based on the provided recipes,
 * cleaning the output, and optionally running a linter for non-JSON files.
 *
 * @param {string} filePath - The path to the file to process
 * @param {Recipe[]} recipes - The list of recipes to enable in the transformation
 * @param {boolean} isMonorepo - Whether the project is a monorepo
 * @returns {Promise<void>} A promise that resolves when the operation is complete
 */
export const proceedCodeChange = async (filePath: string, recipes: Recipe[], isMonorepo: boolean): Promise<void> => {
  if (!fsSync.existsSync(filePath)) {
    return;
  }

  const isMetaProcessablepathSegment = !META_NOT_PROCESABLE_FILE_PATH_SEGMENTS.some(segment =>
    filePath.includes(segment)
  );

  if (!isMetaProcessablepathSegment) {
    return;
  }

  const sourceCode = await fs.readFile(filePath, 'utf8');

  // Replace JSX-style comments with JavaScript comments for MetaScript compatibility
  const updatedContent = sourceCode.replace(JSX_COMMENT_REGEX, (_, content) => `//? ${content.trim()}`);

  const metaProgram = MetaScript.compile(updatedContent);

  const isLocalizationEnabled = recipes.includes('localization');
  const isGAEnabled = recipes.includes('ga');
  const isUniformInsightsEnabled = recipes.includes('uniform-insights');
  const isShadcnEnabled = recipes.includes('shadcn');

  const transformedCode = new MetaScript(metaProgram).transform({
    localization: isLocalizationEnabled,
    ga: isGAEnabled,
    uniformInsights: isUniformInsightsEnabled,
    shadcn: isShadcnEnabled,
    monorepo: isMonorepo,
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

/**
 * Post-processes files based on recipe selection, removing files that are not needed
 * for the selected recipes.
 *
 * @param {string} filePath - The path to the file to process
 * @param {Recipe[]} recipes - The list of selected recipes
 * @returns {Promise<void>} A promise that resolves when the operation is complete
 */
export const postProcessFile = async (filePath: string, recipes: Recipe[]) => {
  const isFileAdditional = Object.values(RECIPE_ADDITIONAL_FILES).some(files => files.includes(filePath));
  if (!isFileAdditional) {
    return;
  }

  const isFileShouldBeIncluded = recipes.some(recipe => RECIPE_ADDITIONAL_FILES[recipe]?.includes(filePath));
  if (!isFileShouldBeIncluded) {
    await fs.rm(filePath);
  }
};

/**
 * Pre-processes files before the main transformation, handling monorepo-specific
 * configurations and removing unnecessary files.
 *
 * @param {string} filePath - The path to the file to process
 * @param {boolean} isMonorepo - Whether the project is a monorepo
 * @returns {Promise<void>} A promise that resolves when the operation is complete
 */
export const preProcessFile = async (filePath: string, isMonorepo: boolean) => {
  const isFileShouldRemoved = FILES_TO_IGNORE_OUTSIDE_OF_MONOREPO.some(file => filePath.includes(file));

  if (isFileShouldRemoved) {
    await fs.rm(filePath);
  }

  if (!isMonorepo) {
    if (filePath.includes('package.json')) {
      await processPackageJson();
    }
  }
};

/**
 * Processes the package.json file to ensure dependencies and project name are correctly
 * configured based on the template and current project settings.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete
 */
const processPackageJson = async () => {
  try {
    const [beforeChanges, afterChanges] = await Promise.all([
      fs.readFile(PACKAGE_JSON_COPY_FILE, 'utf8'),
      fs.readFile(path.join(process.cwd(), 'package.json'), 'utf8'),
    ]);

    const beforeJson = JSON.parse(beforeChanges);
    const afterJson = JSON.parse(afterChanges);

    afterJson.name = beforeJson.name;

    const updateDependencies = (type: 'dependencies' | 'devDependencies') => {
      const baseDependencies: [string, string][] = Object.entries(beforeJson[type] || {});
      const afterDependencies: [string, string][] = Object.entries(afterJson[type] || {});

      for (const [depName, depVersion] of afterDependencies) {
        if (depVersion.includes('*')) {
          const baseDep = baseDependencies.find(([baseDepName]) => baseDepName === depName);
          if (baseDep) {
            afterJson[type][depName] = baseDep[1];
          }
        }
      }
    };

    updateDependencies('dependencies');
    updateDependencies('devDependencies');

    await fs.writeFile(path.join(process.cwd(), 'package.json'), JSON.stringify(afterJson, null, 2));
  } catch (error) {
    console.error('Error processing package.json:', error);
  }
};

/**
 * Adds environment variables to the project configuration by creating or updating
 * the .env file with the provided variables.
 *
 * @param {Partial<Record<EnvVariable, string>>} envVariables - Object containing environment variables to add
 * @returns {Promise<void>} A promise that resolves when the operation is complete
 */
export const addEnvVariablesToProjectConfiguration = async (envVariables: Partial<Record<EnvVariable, string>>) => {
  const envVariablesString = Object.entries(envVariables)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  await fs.writeFile('.env', envVariablesString);
};
