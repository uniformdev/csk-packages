import * as ora from 'ora';
import {
  addEnvVariablesToProjectConfiguration,
  postProcessFile,
  preProcessFile,
  proceedCodeChange,
} from './code-changer';
import { GIT_COMMANDS, TEMPLATE_PRE_PROCESS_FILE_WHITELIST } from './constants';
import { Recipe, ProjectConfiguration, Template } from './types';
import {
  selectTemplate,
  verifyProjectAlignment,
  selectRecipes,
  alignWithFullPackBranch,
  getChangedFilesPath,
  fillEnvVariables,
  alignWithTemplateBranch,
  getValidTemplateFromArgs,
  getValidRecipesFromArgs,
  fillEnvVariablesWithDefaults,
  optionsForResetBranch,
  checkIsMonorepo,
  copyPackageJson,
  cleanupProject,
} from './utils';
import { spawnCmdCommand } from '../../utils';

type InitArgs = {
  dev: boolean;
  template: Template;
  recipes: Recipe[];
};

/**
 * Initializes the CSK CLI workflow.
 */
const init = async (args: InitArgs): Promise<void> => {
  try {
    const { dev, template: templateFromArgs, recipes: recipesFromArgs } = args;
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

    const branchNameBase = `${template}${isRecipesApplied ? `-${recipes.join('-')}` : ''}`;
    const isBranchExists = await spawnCmdCommand(GIT_COMMANDS.GIT_CHECK_BRANCH_EXISTS(branchNameBase));

    if (isBranchExists) {
      const shouldResetBranch = await optionsForResetBranch();
      const branchName = shouldResetBranch ? branchNameBase : `${branchNameBase}-${Date.now()}`;

      await spawnCmdCommand(
        shouldResetBranch
          ? GIT_COMMANDS.GIT_CREATE_BRANCH_FORCE(branchName)
          : GIT_COMMANDS.GIT_CREATE_BRANCH(branchName)
      );
    } else {
      await spawnCmdCommand(GIT_COMMANDS.GIT_CREATE_BRANCH(branchNameBase));
    }

    if (isRecipesApplied) {
      if (!isMonorepo) {
        await copyPackageJson();
      }
      await alignWithFullPackBranch(spinner);

      const installCommand = 'npm install --force';

      spinner.start(`Installing dependencies using ${installCommand} ...`);
      await spawnCmdCommand(installCommand);
      spinner.succeed('Dependencies installed successfully!');

      const changedFiles = await getChangedFilesPath();

      for (const file of changedFiles) {
        spinner.start(`Pre-processing ${file}...`);
        await preProcessFile(file, isMonorepo);
        spinner.succeed(`Pre-processed ${file} successfully!`);

        spinner.start(`Processing ${file}...`);
        await proceedCodeChange(file, recipes, isMonorepo);
        spinner.succeed(`Processed ${file} successfully!`);

        spinner.start(`Post-processing ${file}...`);
        await postProcessFile(file, recipes);
        spinner.succeed(`Post-processed ${file} successfully!`);
      }

      spinner.start('Adding env variables to project configuration...');
      await addEnvVariablesToProjectConfiguration(envVariables);
      spinner.succeed('Env variables added to project configuration successfully!');

      if (!isTemplateApplied && !isMonorepo) {
        spinner.start('Cleaning up project...');
        await cleanupProject();
        spinner.succeed('Project cleaned up successfully!');
      }

      await spawnCmdCommand(GIT_COMMANDS.GIT_ADD);

      await spawnCmdCommand(GIT_COMMANDS.COMMIT_CHANGES('feat: recipes applied'));

      await spawnCmdCommand(GIT_COMMANDS.GIT_RESET);
    }

    if (isTemplateApplied) {
      spinner.start(`Applying the ${template} template for your project...`);
      await alignWithTemplateBranch(spinner, template);

      const changedFiles = await getChangedFilesPath();

      for (const filePath of changedFiles) {
        const isFileShouldBePreProcessed = TEMPLATE_PRE_PROCESS_FILE_WHITELIST.some(file => filePath.includes(file));

        if (isFileShouldBePreProcessed) {
          spinner.start(`Pre-processing template ${filePath}...`);
          await preProcessFile(filePath, isMonorepo);
          spinner.succeed(`Pre-processed template ${filePath} successfully!`);
        }
      }

      spinner.succeed(`${template} template applied successfully!`);

      if (!isMonorepo) {
        spinner.start('Cleaning up project...');
        await cleanupProject();
        spinner.succeed('Project cleaned up successfully!');
      }

      await spawnCmdCommand(GIT_COMMANDS.GIT_ADD);
      await spawnCmdCommand(GIT_COMMANDS.COMMIT_CHANGES('feat: template applied'));
    }

    spinner.succeed('App created successfully!');
  } catch (e) {
    if (e instanceof Error) {
      console.error('e', e);
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
