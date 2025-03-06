/**
 * Utility functions for project initialization and setup.
 * @module init/utils
 */

import fsSync from 'fs';
import fs from 'fs/promises';
import * as ora from 'ora';
import path from 'path';
import { select, checkbox, confirm, input } from '@inquirer/prompts';
import {
  GIT_COMMANDS,
  GIT_BRANCHES,
  REQUIRED_ENV_VARIABLES,
  ENV_VARIABLES_VARIANTS,
  ENV_VARIABLES_DEFAULT_VALUES,
  TEMPLATE_BRANCH_PREFIX,
  RECIPES,
  TEMPLATES_WHITE_LIST,
  PACKAGE_JSON_COPY_FILE,
  TEMPLATE_BRANCH_PREFIX_LOCAL,
} from './constants';
import { EnvVariable, Recipe, Template } from './types';
import { runCmdCommand, spawnCmdCommand } from '../../utils';

/**
 * Verifies if the project is aligned with the remote GOLD branch.
 * Checks for uncommitted changes and offers to update the branch if needed.
 *
 * @param {ora.Ora} spinner - The spinner instance for loading indication
 * @returns {Promise<boolean>} True if the project has changes and user chose not to update, false otherwise
 * @throws {Error} If git commands fail during verification
 */
export const verifyProjectAlignment = async (spinner: ora.Ora): Promise<boolean> => {
  spinner.start('Verifying your project setup and branch alignment...');
  const hasChanges = await runCmdCommand(GIT_COMMANDS.DIFF_QUIET).then(
    () => false,
    () => true
  );

  if (hasChanges) {
    spinner.fail(`Your project has uncommitted changes or is out of sync with the latest "${GIT_BRANCHES.GOLD}"`);
    const wantsToUpdate = await confirm({
      message: 'Do you want to update your branch with the latest changes from origin?',
    });

    if (!wantsToUpdate) {
      spinner.fail('You are not ready to continue. Aborting...');
      return true;
    }

    spinner.start('Updating your branch...');
    await runCmdCommand(GIT_COMMANDS.RESET_HARD);
    spinner.succeed('Your branch has been updated successfully!');
  } else {
    spinner.succeed('Your project is aligned with the remote branch.');
  }

  return false;
};

/**
 * Prompts the user to select a project template from available options.
 * Fetches remote branches and filters them for template branches.
 *
 * @returns {Promise<Template>} The selected template value
 * @throws {Error} If git command fails to fetch remote branches
 */
export const selectTemplate = async (): Promise<Template> => {
  const remoteBranches = await runCmdCommand(GIT_COMMANDS.GIT_REMOTE_BRANCHES);

  const templatesBranches = remoteBranches
    ?.split('\n')
    .filter(branch => branch.includes(TEMPLATE_BRANCH_PREFIX))
    .map(branch => {
      const match = branch.match(/refs\/heads\/.+/);

      const templateValue = match?.[0]?.replace(TEMPLATE_BRANCH_PREFIX, '');

      const templateName = templateValue
        ?.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return {
        name: templateName,
        value: templateValue || '',
      };
    })
    .filter(template => TEMPLATES_WHITE_LIST.includes(template.value));

  return select<Template>({
    message: "Let's start by choosing a template for your project:",
    choices: [{ name: 'Baseline', value: 'baseline' }, ...templatesBranches],
  });
};

/**
 * Validates a template argument against available remote branches.
 *
 * @param {Template} template - The template to validate
 * @returns {Promise<string>} The validated template name
 * @throws {Error} If the template is not found in remote branches
 */
export const getValidTemplateFromArgs = async (template: Template): Promise<string> => {
  if (template === 'baseline') {
    return template;
  }

  const remoteBranches = await runCmdCommand(GIT_COMMANDS.GIT_REMOTE_BRANCHES);

  const templatesBranches = remoteBranches
    ?.split('\n')
    .filter(branch => branch.includes(TEMPLATE_BRANCH_PREFIX))
    .map(branch => {
      const match = branch.match(/refs\/heads\/.+/);

      return match?.[0]?.replace(TEMPLATE_BRANCH_PREFIX, '');
    });

  if (!templatesBranches.includes(template)) {
    throw new Error(`Template "${template}" not found`);
  }

  return template;
};

/**
 * Validates recipe arguments against available recipes.
 *
 * @param {Recipe[]} recipes - Array of recipes to validate
 * @param {ora.Ora} spinner - Spinner instance for progress indication
 * @returns {Promise<Recipe[]>} Array of validated recipes
 */
export const getValidRecipesFromArgs = async (recipes: Recipe[], spinner: ora.Ora): Promise<Recipe[]> => {
  return recipes.reduce<Recipe[]>((acc, recipeFromArgs) => {
    if (RECIPES.includes(recipeFromArgs)) {
      acc.push(recipeFromArgs);
      spinner.succeed(`Recipe "${recipeFromArgs}" found. Adding...`);
    } else {
      spinner.fail(`Recipe "${recipeFromArgs}" not found. Skipping...`);
    }
    return acc;
  }, []);
};

/**
 * Prompts the user to select additional recipes for the project.
 *
 * @returns {Promise<Recipe[]>} Array of selected recipes
 */
export const selectRecipes = async (): Promise<Recipe[]> => {
  const recipes = await checkbox<Recipe>({
    message: 'Now, select the additional recipes you want to include in your project:',
    choices: [
      { name: 'Localization', value: 'localization' },
      { name: 'GA', value: 'ga' },
      { name: 'Uniform Insights', value: 'uniform-insights' },
      { name: 'Shadcn', value: 'shadcn' },
    ],
  });

  return recipes;
};

/**
 * Fills environment variables by prompting the user to select or input values.
 * Handles both development and production environments differently.
 *
 * @param {Recipe[]} recipes - Array of recipes for which environment variables are needed
 * @param {boolean} isDev - Whether the environment is development
 * @returns {Promise<Partial<Record<EnvVariable, string>>>} Object containing filled environment variables
 */
export const fillEnvVariables = async (
  recipes: Recipe[],
  isDev: boolean
): Promise<Partial<Record<EnvVariable, string>>> => {
  // Parse the default environment variables from the .env file
  const defaultEnvVariables = await parseEnvVariables();

  // Determine required environment variables based on provided recipes
  const requiredModuleEnvVariables = recipes.map(appRecipes => REQUIRED_ENV_VARIABLES[appRecipes]).flat();
  const requiredGeneralEnvVariables = [...REQUIRED_ENV_VARIABLES.general, ...requiredModuleEnvVariables];

  // Object to store the resulting environment variables
  const envVariables: Partial<Record<EnvVariable, string>> = {};

  for (const envVariable of requiredGeneralEnvVariables) {
    const possibleVariants = ENV_VARIABLES_VARIANTS[envVariable];

    if (!isDev && (envVariable === 'UNIFORM_CLI_BASE_URL' || envVariable === 'UNIFORM_CLI_BASE_EDGE_URL')) {
      envVariables[envVariable] = ENV_VARIABLES_DEFAULT_VALUES[envVariable];
      continue;
    }

    if (possibleVariants?.length) {
      // Prompt the user to select a variant for the environment variable
      const selectedVariant = await select<string>({
        message: `Select the variant for ${envVariable}:`,
        choices: possibleVariants.map(variant => ({ name: variant, value: variant })),
        default: defaultEnvVariables[envVariable] || ENV_VARIABLES_DEFAULT_VALUES[envVariable],
      });

      envVariables[envVariable] = selectedVariant;
    } else {
      // Prompt the user to input a value for the environment variable
      const value = await input({
        message: `Enter the value for ${envVariable}:`,
        default: defaultEnvVariables[envVariable] || ENV_VARIABLES_DEFAULT_VALUES[envVariable],
      });
      envVariables[envVariable] = value;
    }
  }

  return envVariables;
};

/**
 * Fills environment variables with default values without user prompts.
 *
 * @param {Recipe[]} recipes - Array of recipes for which environment variables are needed
 * @returns {Promise<Partial<Record<EnvVariable, string>>>} Object containing environment variables with default values
 */
export const fillEnvVariablesWithDefaults = async (
  recipes: Recipe[]
): Promise<Partial<Record<EnvVariable, string>>> => {
  // Parse the default environment variables from the .env file
  const defaultEnvVariables = await parseEnvVariables();

  // Determine required environment variables based on provided recipes
  const requiredModuleEnvVariables = recipes.map(appRecipes => REQUIRED_ENV_VARIABLES[appRecipes]).flat();
  const requiredGeneralEnvVariables = [...REQUIRED_ENV_VARIABLES.general, ...requiredModuleEnvVariables];

  // Object to store the resulting environment variables
  const envVariables: Partial<Record<EnvVariable, string>> = {};

  for (const envVariable of requiredGeneralEnvVariables) {
    envVariables[envVariable] = defaultEnvVariables[envVariable] || ENV_VARIABLES_DEFAULT_VALUES[envVariable];
  }

  return envVariables;
};

/**
 * Parses environment variables from the .env file.
 *
 * @returns {Promise<Record<string, string>>} Object containing environment variables from .env file
 */
export const parseEnvVariables = async (): Promise<Record<string, string>> => {
  if (!fsSync.existsSync('.env')) {
    return {};
  }

  // Read the contents of the .env file
  const envVariables = await fs.readFile('.env', 'utf8');

  // Convert the .env file content into an object
  const envVariablesObject = Object.fromEntries(
    envVariables
      .split('\n')
      .map(line => line.split('='))
      .filter(([key, value]) => key && value)
  );

  return envVariablesObject;
};

/**
 * Recursively copies a directory and its contents to a target location.
 *
 * @param {string} sourceDir - Source directory path
 * @param {string} targetDir - Target directory path
 * @throws {Error} If directory operations fail
 */
export const copyDirectory = (sourceDir: string, targetDir: string): void => {
  if (!fsSync.existsSync(targetDir)) {
    fsSync.mkdirSync(targetDir, { recursive: true }); // Create target directory if it doesn't exist
  }

  fsSync.readdirSync(sourceDir).forEach((file: string) => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    const isDirectory = fsSync.lstatSync(sourcePath).isDirectory();

    if (isDirectory) {
      copyDirectory(sourcePath, targetPath); // Recursively copy subdirectories
    } else {
      fsSync.copyFileSync(sourcePath, targetPath); // Copy files
    }
  });
};

/**
 * Gets the external branch name based on the template.
 *
 * @param {string} template - The template name
 * @returns {string} The formatted branch name
 */
export const getExternalBranchName = (template: string): string => {
  return template === 'baseline' ? GIT_BRANCHES.FULL_PACK : `${TEMPLATE_BRANCH_PREFIX_LOCAL}${template}`;
};

/**
 * Aligns the current branch with the full-pack branch.
 * Clones the repository, copies necessary files, and cleans up.
 *
 * @param {string} branchName - The name of the branch to align with
 * @throws {Error} If alignment process fails
 */
export const alignWithExternalBranch = async (branchName: string): Promise<void> => {
  const pathToClonedRepo = path.join(process.cwd(), 'csk-packages');
  const appPath = path.join(pathToClonedRepo, 'apps', 'csk-v-next');

  if (fsSync.existsSync(pathToClonedRepo)) {
    fsSync.rmSync(pathToClonedRepo, { recursive: true, force: true });
  }

  await spawnCmdCommand(GIT_COMMANDS.ALIGN_WITH_EXTERNAL_BRANCH(branchName));
  copyDirectory(appPath, process.cwd());

  fsSync.rmSync(pathToClonedRepo, { recursive: true, force: true });
};

/**
 * Retrieves the paths of changed files in the current Git working directory.
 *
 * @returns {Promise<string[]>} Array of changed file paths
 * @throws {Error} If Git command fails
 */
export const getChangedFilesPath = async (): Promise<string[]> => {
  try {
    const changedFiles: string = await runCmdCommand(GIT_COMMANDS.GET_CHANGED_FILES);

    // Split the result by newline and filter out any empty strings
    return changedFiles?.split('\n').filter(filePath => filePath.trim() !== '');
  } catch (error) {
    console.error(`Error while fetching changed files: ${error}`);
    throw error;
  }
};

/**
 * Resolves a relative path against a base directory.
 * Ensures compatibility across Unix and Windows systems.
 *
 * @param {string} baseDir - The base directory (absolute path)
 * @param {string} relativePath - The relative path to resolve
 * @returns {string} The resolved and normalized path
 */
export const resolvePath = (baseDir: string, relativePath: string): string => {
  // Normalize paths for cross-platform compatibility
  const normalizedBaseDir = path.normalize(baseDir);
  const normalizedRelativePath = path.normalize(relativePath);

  // Split baseDir and remove segments present in relativePath
  const baseDirSegments = normalizedBaseDir
    .split(path.sep)
    .filter(segment => !normalizedRelativePath.includes(segment));

  // Join the filtered baseDir with the relative path
  const resolvedPath = path.join(path.sep, ...baseDirSegments, normalizedRelativePath);

  return path.normalize(resolvedPath); // Return the normalized path
};

/**
 * Checks if the current directory is part of a monorepo structure.
 * Looks for 'apps' and 'packages' directories in the parent structure.
 *
 * @returns {boolean} True if the directory is part of a monorepo, false otherwise
 * @throws {Error} If directory read operations fail
 */
export const checkIsMonorepo = () => {
  const currentDir = process.cwd();

  const monorepoRoot = path.join(currentDir, '..', '..');

  const isAppFolders = fsSync.readdirSync(monorepoRoot).some(folder => folder.includes('apps'));
  const isPackagesFolders = fsSync.readdirSync(monorepoRoot).some(folder => folder.includes('packages'));

  return isAppFolders && isPackagesFolders;
};

/**
 * Creates a copy of the package.json file with a predefined name.
 *
 * @returns {Promise<void>}
 * @throws {Error} If file copy operation fails
 */
export const copyPackageJson = async (): Promise<void> => {
  const sourcePath = path.join(process.cwd(), 'package.json');
  const targetPath = path.join(process.cwd(), PACKAGE_JSON_COPY_FILE);

  return fs.copyFile(sourcePath, targetPath);
};

/**
 * Cleans up and removes unused files.
 *
 * @returns {Promise<void>}
 * @throws {Error} If file removal operation fails
 */
export const cleanupProject = async (): Promise<void> => {
  const packageJsonCopyPath = path.join(process.cwd(), PACKAGE_JSON_COPY_FILE);

  if (fsSync.existsSync(packageJsonCopyPath)) {
    await fs.rm(packageJsonCopyPath);
  }
};

/**
 * Logs a start message using the spinner if verbose mode is enabled.
 *
 * @param {ora.Ora} spinner - The spinner instance
 * @param {string} message - The message to display
 * @param {boolean} verbose - Whether verbose mode is enabled
 */
export const startLog = (spinner: ora.Ora, message: string, verbose: boolean): void => {
  if (verbose) {
    spinner.start(message);
  }
};

/**
 * Logs a success message using the spinner if verbose mode is enabled.
 *
 * @param {ora.Ora} spinner - The spinner instance
 * @param {string} message - The message to display
 * @param {boolean} verbose - Whether verbose mode is enabled
 */
export const successLog = (spinner: ora.Ora, message: string, verbose: boolean): void => {
  if (verbose) {
    spinner.succeed(message);
  }
};

/**
 * Logs a failure message using the spinner if verbose mode is enabled.
 *
 * @param {ora.Ora} spinner - The spinner instance
 * @param {string} message - The message to display
 * @param {boolean} verbose - Whether verbose mode is enabled
 */
export const failLog = (spinner: ora.Ora, message: string, verbose: boolean): void => {
  if (verbose) {
    spinner.fail(message);
  }
};

/**
 * Executes a function with logs and error handling.
 */
export const executeWithLogs = async (
  fn: () => Promise<unknown>,
  spinner: ora.Ora,
  startMsg: string,
  successMsg: string,
  verbose: boolean
) => {
  startLog(spinner, startMsg, verbose);
  await fn();
  successLog(spinner, successMsg, verbose);
};
