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
} from './constants';
import { EnvVariable, Module, Template } from './types';
import { runCmdCommand } from '../../utils';
/**
 * Verifies if the project is aligned with the remote GOLD branch.
 * @param spinner The spinner instance for loading indication.
 * @returns True if the project has changes, false otherwise.
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
 * Prompts the user to select a project template.
 * @returns The selected template.
 */
export const selectTemplate = async (): Promise<Template> => {
  const remoteBranches = await runCmdCommand(GIT_COMMANDS.GIT_REMOTE_BRANCHES);

  const templatesBranches = remoteBranches
    ?.split('\n')
    .filter(branch => branch.includes(TEMPLATE_BRANCH_PREFIX))
    .map(branch => {
      const templateValue = branch.replace(TEMPLATE_BRANCH_PREFIX, '').trim();
      const templateName = templateValue
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return {
        name: templateName,
        value: templateValue,
      };
    });

  return select<Template>({
    message: 'Let’s start by choosing a template for your project:',
    choices: [{ name: 'Baseline', value: 'baseline' }, ...templatesBranches],
  });
};

/**
 * Prompts the user to select modules for the project.
 * @returns The selected modules.
 */
export const selectModules = async (): Promise<Module[]> => {
  const modules = await checkbox<Module>({
    message: 'Now, select the additional modules you want to include in your project:',
    choices: [
      { name: 'Localization', value: 'localization' },
      { name: 'Context DevTools', value: 'context-dev-tools' },
      { name: 'GA', value: 'ga' },
      { name: 'Uniform Insights', value: 'uniform-insights' },
    ],
  });

  return modules;
};

export const fillEnvVariables = async (modules: Module[]) => {
  const requiredModuleEnvVariables = modules.map(appModules => REQUIRED_ENV_VARIABLES[appModules]).flat();
  const requiredGeneralEnvVariables = [...REQUIRED_ENV_VARIABLES.general, ...requiredModuleEnvVariables];

  const envVariables: Partial<Record<EnvVariable, string>> = {};

  for (const envVariable of requiredGeneralEnvVariables) {
    const possibleVariants = ENV_VARIABLES_VARIANTS[envVariable];

    if (possibleVariants?.length) {
      const selectedVariant = await select<string>({
        message: `Select the variant for ${envVariable}:`,
        choices: possibleVariants.map(variant => ({ name: variant, value: variant })),
        default: ENV_VARIABLES_DEFAULT_VALUES[envVariable],
      });

      envVariables[envVariable] = selectedVariant;
    } else {
      const value = await input({
        message: `Enter the value for ${envVariable}:`,
        default: ENV_VARIABLES_DEFAULT_VALUES[envVariable],
      });
      envVariables[envVariable] = value;
    }
  }

  return envVariables;
};

/**
 * Aligns the current branch with the `full-pack` branch.
 *
 * This function runs the Git command to align the current branch with the `full-pack` branch.
 * A spinner is used to indicate the progress. If the alignment fails, the error is logged, and the process halts.
 *
 * @param {ora.Ora} spinner - The Ora spinner instance used to display progress.
 * @returns {Promise<void>} Resolves when the alignment is successful.
 * @throws Will throw an error if the alignment process fails.
 */
export const alignWithFullPackBranch = async (spinner: ora.Ora): Promise<void> => {
  try {
    spinner.start(`Aligning ${GIT_BRANCHES.FULL_PACK} branch...`);
    await runCmdCommand(GIT_COMMANDS.ALIGN_WITH_FULL_PACK_BRACH);
    spinner.succeed('Full-pack branch aligned successfully!');
  } catch (error) {
    spinner.fail(`Failed to align ${GIT_BRANCHES.FULL_PACK} branch: ${error}. Please try again.`);
  }
};

/**
 * Aligns the current branch with the template branch.
 *
 * This function runs the Git command to align the current branch with the template branch.
 * A spinner is used to indicate the progress. If the alignment fails, the error is logged, and the process halts.
 *
 * @param {ora.Ora} spinner - The Ora spinner instance used to display progress.
 * @returns {Promise<void>} Resolves when the alignment is successful.
 * @throws Will throw an error if the alignment process fails.
 */
export const alignWithTemplateBranch = async (spinner: ora.Ora, template: string): Promise<void> => {
  try {
    spinner.start(`Aligning ${template} branch...`);
    await runCmdCommand(GIT_COMMANDS.ALIGN_WITH_TEMPLATE_BRANCH(template));
    spinner.succeed(`${template} branch aligned successfully!`);
  } catch (error) {
    spinner.fail(`Failed to align ${template} branch: ${error}. Please try again.`);
  }
};

/**
 * Retrieves the paths of changed files in the current Git working directory.
 *
 * This function executes a Git command to list all changed files and returns their paths as an array.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of file paths.
 * @throws Will throw an error if the command to get changed files fails.
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
 * Resolves a relative path against a base directory, ensuring compatibility across Unix and Windows.
 *
 * @param {string} baseDir - The base directory (absolute path).
 * @param {string} relativePath - The relative path to resolve.
 * @returns {string} The resolved and normalized path.
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
