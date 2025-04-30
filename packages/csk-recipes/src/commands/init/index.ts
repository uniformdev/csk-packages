import * as ora from 'ora';
import {
  addEnvVariablesToProjectConfiguration,
  postProcessFile,
  preProcessFile,
  proceedCodeChange,
} from './code-changer';
import { Recipe, ProjectConfiguration, Template } from './types';
import {
  selectTemplate,
  verifyProjectAlignment,
  selectRecipes,
  getChangedFilesPath,
  fillEnvVariables,
  getValidTemplateFromArgs,
  getValidRecipesFromArgs,
  fillEnvVariablesWithDefaults,
  checkIsMonorepo,
  copyPackageJson,
  cleanupProject,
  getExternalBranchName,
  alignWithExternalBranch,
  executeWithLogs,
  verifyGitProject,
} from './utils';
import { spawnCmdCommand } from '../../utils';

type InitArgs = {
  dev: boolean;
  template: Template;
  recipes: Recipe[];
  verbose: boolean;
};

/**
 * Initializes the CSK CLI workflow.
 */
const init = async ({
  dev,
  template: templateFromArgs,
  recipes: recipesFromArgs,
  verbose,
}: InitArgs): Promise<void> => {
  const spinner = ora.default();
  console.info('🚀 Welcome to the CSK CLI! 🧡\n');

  try {
    const { hasGit, wantsContinue } = await verifyGitProject(spinner);

    if (!hasGit && !wantsContinue) return;

    if (hasGit) {
      if (!dev && (await verifyProjectAlignment(spinner))) return;
    }

    const isMonorepo = checkIsMonorepo();
    const notInteractiveMode = Boolean(templateFromArgs && recipesFromArgs);

    const template = templateFromArgs ? await getValidTemplateFromArgs(templateFromArgs) : await selectTemplate();
    const recipes = recipesFromArgs
      ? await getValidRecipesFromArgs(recipesFromArgs, spinner)
      : await selectRecipes(template);

    const envVariables = notInteractiveMode
      ? await fillEnvVariablesWithDefaults(recipes)
      : await fillEnvVariables(recipes);

    if (notInteractiveMode) {
      spinner.info('You are running in non-interactive mode. Please fill .env file manually.');
    }

    const projectConfiguration: ProjectConfiguration = { template, recipes, envVariables };

    if (!projectConfiguration.recipes.length && projectConfiguration.template === 'baseline') {
      console.info('🚀 Project initialized successfully!');
      return;
    }

    await setupProject({ projectConfiguration, isMonorepo, verbose, spinner });
    spinner.succeed('App created successfully!');
  } catch (e) {
    handleError(e);
  }
};

/**
 * Handles the main project setup and file processing.
 */
const setupProject = async ({
  projectConfiguration,
  isMonorepo,
  verbose,
  spinner,
}: {
  projectConfiguration: ProjectConfiguration;
  isMonorepo: boolean;
  verbose: boolean;
  spinner: ora.Ora;
}) => {
  const { template, recipes, envVariables } = projectConfiguration;
  const externalBranchName = getExternalBranchName(template, recipes);

  if (!externalBranchName) return;

  if (!isMonorepo) await copyPackageJson();
  if (!verbose) spinner.start('Starting preparation, it may take a while...');

  await executeWithLogs(
    () => alignWithExternalBranch(externalBranchName),
    spinner,
    `Aligning ${externalBranchName} branch...`,
    `${externalBranchName} branch aligned successfully!`,
    verbose
  );

  await executeWithLogs(
    () => spawnCmdCommand('npm install --force'),
    spinner,
    'Installing dependencies...',
    'Dependencies installed successfully!',
    verbose
  );

  for (const file of await getChangedFilesPath()) {
    await processFile(file, recipes, isMonorepo, spinner, verbose);
  }

  //we need to install dependencies again after processing the files to rebuild the package-lock.json
  await executeWithLogs(
    () => spawnCmdCommand('npm install --force'),
    spinner,
    'Installing dependencies...',
    'Dependencies installed successfully!',
    verbose
  );

  await executeWithLogs(
    () => addEnvVariablesToProjectConfiguration(envVariables),
    spinner,
    'Adding environment variables...',
    'Environment variables added successfully!',
    verbose
  );

  if (!isMonorepo) {
    await executeWithLogs(
      cleanupProject,
      spinner,
      'Cleaning up project...',
      'Project cleaned up successfully!',
      verbose
    );
  }
};

/**
 * Processes individual files during project setup.
 */
const processFile = async (
  file: string,
  recipes: Recipe[],
  isMonorepo: boolean,
  spinner: ora.Ora,
  verbose: boolean
) => {
  await executeWithLogs(
    () => preProcessFile(file, isMonorepo),
    spinner,
    `Pre-processing ${file}...`,
    `Pre-processed ${file} successfully!`,
    verbose
  );
  await executeWithLogs(
    () => proceedCodeChange(file, recipes, isMonorepo),
    spinner,
    `Processing ${file}...`,
    `Processed ${file} successfully!`,
    verbose
  );
  await executeWithLogs(
    () => postProcessFile(file, recipes),
    spinner,
    `Post-processing ${file}...`,
    `Post-processed ${file} successfully!`,
    verbose
  );
};

/**
 * Handles errors gracefully.
 */
const handleError = (error: unknown) => {
  if (error instanceof Error) {
    if (error.message.includes('force closed')) {
      console.info('\n👋 See you next time! 🧡\n');
    } else {
      console.error(`\n🙁 An error occurred: ${error.message}\nPlease try again.\n`);
      process.exit(1);
    }
  } else {
    console.error(`\n🙁 An unexpected error occurred: ${error}\nPlease try again.\n`);
    process.exit(1);
  }
};

export default init;
