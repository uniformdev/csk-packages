import * as ora from 'ora';
import { addEnvVariablesToProjectConfiguration, proceedCodeChange } from './code-changer';
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
} from './utils';
import { runCmdCommand } from '../../utils';

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

    if (projectConfiguration?.recipes.length === 0) {
      console.info('🚀 Project initialized successfully!');
      return;
    }

    await alignWithFullPackBranch(spinner);

    spinner.start('Installing dependencies...');
    await runCmdCommand('npm install');
    spinner.succeed('Dependencies installed successfully!');

    const changedFiles = await getChangedFilesPath();

    for (const file of changedFiles) {
      spinner.start(`Processing ${file}...`);
      await proceedCodeChange(file, recipes);
      spinner.succeed(`Processed ${file} successfully!`);
    }

    spinner.start('Adding env variables to project configuration...');
    await addEnvVariablesToProjectConfiguration(envVariables);
    spinner.succeed('Env variables added to project configuration successfully!');

    if (template !== 'baseline') {
      spinner.start(`Applying the ${template} template for your project...`);
      await alignWithTemplateBranch(spinner, template);
      spinner.succeed(`${template} template applied successfully!`);
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
