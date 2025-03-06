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
  startLog,
  successLog,
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
const init = async (args: InitArgs): Promise<void> => {
  try {
    const { dev, template: templateFromArgs, recipes: recipesFromArgs, verbose } = args;
    const notInteractiveMode = templateFromArgs && recipesFromArgs;
    const isMonorepo = checkIsMonorepo();
    const spinner = ora.default();
    console.info('🚀 Welcome to the CSK CLI! 🧡\n');

    if (!dev) {
      // Verify project alignment
      const hasChanges = await verifyProjectAlignment(spinner);
      if (hasChanges) return;
    }
    // Prompt user for project configuration
    const template = templateFromArgs ? await getValidTemplateFromArgs(templateFromArgs) : await selectTemplate();
    const recipes = recipesFromArgs ? await getValidRecipesFromArgs(recipesFromArgs, spinner) : await selectRecipes();
    const envVariables = notInteractiveMode
      ? await fillEnvVariablesWithDefaults(recipes)
      : await fillEnvVariables(recipes, dev);

    if (notInteractiveMode) {
      spinner.info('You are runing in non-interactive mode. Please fill .env file manually.');
    }

    // Build and display the project configuration
    const projectConfiguration: ProjectConfiguration = { template, recipes, envVariables };

    const isRecipesApplied = projectConfiguration?.recipes.length > 0;
    const isTemplateApplied = projectConfiguration?.template !== 'baseline';

    if (!isRecipesApplied && !isTemplateApplied) {
      console.info('🚀 Project initialized successfully!');
      return;
    }

    const externalBranchName = getExternalBranchName(template);

    if (externalBranchName) {
      if (!isMonorepo) {
        await copyPackageJson();
      }

      if (!verbose) {
        spinner.start(`Starting preparing your app, it can take a while...`);
      }

      startLog(spinner, `Aligning ${externalBranchName} branch...`, verbose);
      await alignWithExternalBranch(externalBranchName);
      successLog(spinner, `${externalBranchName} branch aligned successfully!`, verbose);

      const installCommand = 'npm install --force';

      startLog(spinner, `Installing dependencies using ${installCommand} ...`, verbose);
      await spawnCmdCommand(installCommand);
      successLog(spinner, 'Dependencies installed successfully!', verbose);

      const changedFiles = await getChangedFilesPath();

      for (const file of changedFiles) {
        startLog(spinner, `Pre-processing ${file}...`, verbose);
        await preProcessFile(file, isMonorepo);
        successLog(spinner, `Pre-processed ${file} successfully!`, verbose);

        startLog(spinner, `Processing ${file}...`, verbose);
        await proceedCodeChange(file, recipes, isMonorepo);
        successLog(spinner, `Processed ${file} successfully!`, verbose);

        startLog(spinner, `Post-processing ${file}...`, verbose);
        await postProcessFile(file, recipes);
        successLog(spinner, `Post-processed ${file} successfully!`, verbose);
      }

      startLog(spinner, 'Adding env variables to project configuration...', verbose);
      await addEnvVariablesToProjectConfiguration(envVariables);
      successLog(spinner, 'Env variables added to project configuration successfully!', verbose);

      if (!isMonorepo) {
        startLog(spinner, 'Cleaning up project...', verbose);
        await cleanupProject();
        successLog(spinner, 'Project cleaned up successfully!', verbose);
      }
    }

    spinner.succeed('App created successfully!');
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes('force closed')) {
        console.info('\n👋 See you next time! 🧡\n');
      } else {
        console.error(`\n🙁 An error occurred: ${e.message}\nPlease try again.\n`);
        process.exit(1);
      }
    } else {
      console.error(`\n🙁 An unexpected error occurred: ${e}\nPlease try again.\n`);
      process.exit(1);
    }
  }
};

export default init;
