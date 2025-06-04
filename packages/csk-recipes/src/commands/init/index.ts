import * as ora from 'ora';
import path from 'path';
import { confirm } from '@inquirer/prompts';
import {
  addEnvVariablesToProjectConfiguration,
  isMetaProcessable,
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
  createProgressPrinter,
} from './utils';
import {
  RECIPE_SPECIFIC_NOTES,
  REQUEST_ENV_VARIABLES_TO_PUSH,
  REQUIRED_DATA_SOURCES,
  SETUP_PROJECT_STEP_PERCENTAGE,
} from '../../constants';
import {
  installDataSources,
  promptForAccessToken,
  runCommandWithSpinner,
  runStartInteractive,
  spawnCmdCommand,
} from '../../utils';

type InitArgs = {
  dev: boolean;
  template: Template;
  recipes: Recipe[];
  verbose: boolean;
};

/**
 * Initializes the CSK CLI workflow.
 *
 * This function:
 * - Verifies Git status and project alignment
 * - Prompts the user (or uses CLI args) to select a template and recipes
 * - Collects required environment variables (either interactively or with defaults)
 * - Configures and sets up the project environment
 * - Displays important follow-up notes and warnings for missing environment variables
 *
 * In non-interactive mode, the CLI skips prompts and relies on provided `template` and `recipes`.
 * A visual spinner is used to track setup progress unless verbose mode is enabled.
 *
 * @param {InitArgs} params - Arguments to control CLI initialization.
 * @param {boolean} params.dev - Whether to run in development mode (uses dev branch alignment).
 * @param {string | undefined} params.template - Optional CLI argument to pre-select a template.
 * @param {string[] | undefined} params.recipes - Optional CLI argument to pre-select recipes.
 * @param {boolean} params.verbose - If true, disables spinner visuals and enables detailed logs.
 *
 * @returns {Promise<void>} A promise that resolves once the setup process is complete.
 */
const init = async ({
  dev,
  template: templateFromArgs,
  recipes: recipesFromArgs,
  verbose,
}: InitArgs): Promise<void> => {
  const spinner = ora.default();
  const readmePath = path.resolve(process.cwd(), 'README.md');
  spinner.info("🚀 Welcome to the Component Starter Kit CLI!\nLet's get your project up and running. 🧡\n");

  try {
    const { hasGit, wantsContinue } = await verifyGitProject(spinner);
    if (!hasGit && !wantsContinue) return;

    if (hasGit && !dev) {
      const misaligned = await verifyProjectAlignment(spinner);
      if (misaligned) return;
    }

    const isMonorepo = checkIsMonorepo();
    const nonInteractive = Boolean(templateFromArgs && recipesFromArgs);

    const template = templateFromArgs ? await getValidTemplateFromArgs(templateFromArgs) : await selectTemplate();

    const recipes = recipesFromArgs
      ? await getValidRecipesFromArgs(recipesFromArgs, spinner)
      : await selectRecipes(template);

    const envVariables = nonInteractive
      ? await fillEnvVariablesWithDefaults(recipes)
      : await fillEnvVariables(recipes, spinner, readmePath);

    const missingEnvKeys = Object.entries(envVariables)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    const canPushCanvasData = REQUEST_ENV_VARIABLES_TO_PUSH.every(key => !missingEnvKeys.includes(key));
    const isNeedToPushCanvasData = template !== 'baseline';

    if (recipes.length > 0 || isNeedToPushCanvasData) {
      await setupApplication({
        projectConfiguration: {
          template,
          recipes,
          envVariables,
        },
        isMonorepo,
        verbose,
        spinner,
        dev,
      });
    }

    const dataSourceToInstall = Array.from(
      new Map(
        recipes
          .flatMap(recipe => REQUIRED_DATA_SOURCES[recipe as keyof typeof RECIPE_SPECIFIC_NOTES])
          .filter(Boolean)
          .map(obj => [obj.data.id, obj])
      ).values()
    );

    const hasDataSources = dataSourceToInstall.length > 0;

    let isPushedToUniform = false;
    if (isNeedToPushCanvasData && canPushCanvasData) {
      const confirmPush = await confirm({
        message: `Do you want to push the canvas data${hasDataSources ? ' and install the data sources' : ''} to Uniform automatically?`,
      });

      if (confirmPush) {
        if (hasDataSources) {
          const token = await promptForAccessToken();
          await installDataSources(dataSourceToInstall, token, spinner);
        }
        await runCommandWithSpinner('npm run init', spinner, 'Pushing canvas data to Uniform:');
        spinner.succeed('Done! Canvas data successfully pushed to Uniform.');
        isPushedToUniform = true;
      }
    }

    const allEnvSet = missingEnvKeys.length === 0;
    if (allEnvSet && (!isNeedToPushCanvasData || isPushedToUniform)) {
      const startPrompt = 'Do you want to build and start the application now?';
      const buildAndStart = await confirm({ message: startPrompt });

      if (buildAndStart) {
        spinner.start('Building the project...');
        await spawnCmdCommand('npm run build');
        spinner.succeed('Done! Your app has been built successfully and is ready to run.');

        runStartInteractive();
        return;
      }
    }

    if (!allEnvSet || (dataSourceToInstall && !isPushedToUniform)) {
      spinner.warn('⚠️  IMPORTANT NOTES BEFORE STARTING THE APPLICATION ⚠️');

      if (!allEnvSet) {
        console.info(
          `\n⚠️  Some environment variables are missing!\nPlease set the following variables in your .env file:\n${missingEnvKeys.map(key => `    • ${key}`).join('\n')}\n📘 For details, see: ${readmePath}\n`
        );
      }

      const notes = recipes
        .map(recipe => RECIPE_SPECIFIC_NOTES[recipe as keyof typeof RECIPE_SPECIFIC_NOTES])
        .flat()
        .filter(Boolean);

      if (notes.length) {
        console.info(`⚠️  Additional Setup Required:\n${notes.join('\n')}\n`);
      }
    }

    spinner.succeed(
      `🚀 Application initialized successfully! Run ${
        isNeedToPushCanvasData && !isPushedToUniform ? '`npm run init` to set up your Uniform project then run ' : ''
      }\`npm run dev\` or \`npm run build && npm run start\` to start the server.`
    );
  } catch (error) {
    handleError(error);
  }
};

/**
 * Runs the full initialization pipeline for setting up an application based on a given configuration.
 *
 * This includes:
 * - Aligning the working directory with a remote template branch
 * - Installing dependencies
 * - Processing project files (pre-process, transform, post-process)
 * - Applying environment variables
 * - Cleaning up the workspace (if not a monorepo)
 *
 * Throughout the setup, progress is displayed via a spinner and a dynamic progress bar.
 *
 * @param {Object} params - Configuration and execution options.
 * @param {ProjectConfiguration} params.projectConfiguration - The full project config, including template, recipes, and env variables.
 * @param {boolean} params.isMonorepo - Whether the app is part of a monorepo (affects dependency and cleanup logic).
 * @param {boolean} params.verbose - Whether to run in verbose mode (disables spinner/progress visuals).
 * @param {ora.Ora} params.spinner - Ora spinner instance for displaying step-based progress in the terminal.
 * @param {boolean} params.dev - If true, uses a development-specific branch for bootstrapping the project.
 *
 * @returns {Promise<void>} Resolves when all setup steps complete successfully.
 */
const setupApplication = async ({
  projectConfiguration,
  isMonorepo,
  verbose,
  spinner,
  dev,
}: {
  projectConfiguration: ProjectConfiguration;
  isMonorepo: boolean;
  verbose: boolean;
  spinner: ora.Ora;
  dev: boolean;
}) => {
  const { template, recipes, envVariables } = projectConfiguration;
  const externalBranchName = getExternalBranchName(template, recipes, dev);
  if (!externalBranchName) return;

  if (!isMonorepo) await copyPackageJson();

  const setProgress = createProgressPrinter(
    spinner,
    'Installing your application, it could take up to 5-10 minutes...'
  );
  setProgress(SETUP_PROJECT_STEP_PERCENTAGE.INITIAL_STEP);

  // Helper to wrap executeWithLogs with bound spinner and verbose
  const step = (fn: () => Promise<unknown>, startMsg: string, doneMsg: string, progress?: number) =>
    executeWithLogs(
      fn,
      spinner,
      startMsg,
      doneMsg,
      () => progress !== undefined && !verbose && setProgress(progress),
      verbose
    );

  // Step 1 - Align with external branch
  await step(
    () => alignWithExternalBranch(externalBranchName),
    `Aligning ${externalBranchName} branch...`,
    `${externalBranchName} branch aligned successfully!`,
    SETUP_PROJECT_STEP_PERCENTAGE.STEP_1
  );

  // Step 2 - Install dependencies
  await step(
    () => spawnCmdCommand('npm install --force'),
    'Installing dependencies...',
    'Dependencies installed successfully!',
    SETUP_PROJECT_STEP_PERCENTAGE.STEP_2
  );

  const files = await getChangedFilesPath();

  // Step 3 - Pre-process files
  for (const file of files) {
    await step(
      () => preProcessFile(file, isMonorepo),
      `Pre-processing ${file}...`,
      `Pre-processed ${file} successfully!`,
      SETUP_PROJECT_STEP_PERCENTAGE.STEP_3
    );
  }

  // Step 4 - Process with progress per file
  const baseProgress = SETUP_PROJECT_STEP_PERCENTAGE.STEP_3;
  const nextProgress = SETUP_PROJECT_STEP_PERCENTAGE.STEP_4;
  const metaFiles = files.filter(isMetaProcessable);
  const percentPerFile = metaFiles.length
    ? (nextProgress - baseProgress) / metaFiles.length
    : nextProgress - baseProgress;

  for (const [index, file] of metaFiles.entries()) {
    await step(
      () => proceedCodeChange(file, recipes, isMonorepo),
      `Processing ${file}...`,
      `Processed ${file} successfully!`,
      baseProgress + percentPerFile * (index + 1)
    );
  }

  // Step 5 - Post-process files
  for (const file of files) {
    await step(
      () => postProcessFile(file, recipes),
      `Post-processing ${file}...`,
      `Post-processed ${file} successfully!`,
      SETUP_PROJECT_STEP_PERCENTAGE.STEP_5
    );
  }

  // Step 6 - Reinstall dependencies after processing the files
  await step(
    () => spawnCmdCommand('npm install --force'),
    'Installing dependencies...',
    'Dependencies installed successfully!',
    SETUP_PROJECT_STEP_PERCENTAGE.STEP_6
  );

  // Step 7 - Add environment variables
  await step(
    () => addEnvVariablesToProjectConfiguration(envVariables),
    'Adding environment variables...',
    'Environment variables added successfully!',
    SETUP_PROJECT_STEP_PERCENTAGE.STEP_7
  );

  // Step 8 - Cleanup project
  if (!isMonorepo) {
    await step(
      cleanupProject,
      'Cleaning up project...',
      'Project cleaned up successfully!',
      SETUP_PROJECT_STEP_PERCENTAGE.STEP_8
    );
  }

  setProgress(SETUP_PROJECT_STEP_PERCENTAGE.FINAL_STEP);
  spinner.succeed('App created successfully!');
};

/**
 * Handles unexpected errors during CLI execution gracefully.
 *
 * - If the error message contains "force closed", it logs a friendly exit message.
 * - If it's a regular Error instance, it prints the error message and exits the process.
 * - If it's an unknown error type (non-Error object), it stringifies and displays it.
 *
 * This function always exits the process with code 1 for fatal errors,
 * unless the error indicates a voluntary exit (e.g., by closing prompts).
 *
 * @param {unknown} error - The error object thrown during execution (can be any type).
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
