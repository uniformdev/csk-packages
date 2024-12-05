import fs from 'fs';
import * as ora from 'ora';
import path from 'path';
import { input } from '@inquirer/prompts';
import { END_MAPPER_REGEX, MAPPING_REGEX, REGISTER_IMPORT_REGEX, REGISTER_KEY_REGEX } from '../constants';
import { FileHandler } from '../types';
import { formatWithPrettier, getComponentNameBasedOnId, runCmdCommand } from '../utils';

const progressSpinner = ora.default();

export const registerComponentFile: FileHandler = {
  path: async ({ pathToCanvasFolder }) => {
    const customCanvasResolverPath = path.resolve(pathToCanvasFolder, 'index.ts');
    if (!fs.existsSync(pathToCanvasFolder)) {
      await input({
        message: `We didn't find custom-canvas resolver file. Could you please provide path to the custom-canvas resolver file:`,
        required: true,
        validate: value => {
          if (!fs.existsSync(value)) return 'Path is not valid';
          return true;
        },
      });
    }
    return customCanvasResolverPath;
  },
  write: async ({ destinationPath, definition }) => {
    const componentName = getComponentNameBasedOnId(definition.id);
    progressSpinner?.start(`Generating ${destinationPath} file`);

    const canvasIndex = await fs.promises.readFile(destinationPath, 'utf-8');

    const importFileSection = `import { ${componentName} } from './${componentName}';`;

    // Find the object
    const updatedData = canvasIndex
      .replace(REGISTER_IMPORT_REGEX, match => {
        if (canvasIndex.includes(importFileSection)) {
          progressSpinner.info(`Import already exists. This step will be skipped for the ${componentName} component.`);
          return match;
        } else {
          progressSpinner.info(`Import of ${componentName} component added successfully.`);
          return `${match}\n${importFileSection}`;
        }
      })
      .replace(MAPPING_REGEX, match => {
        const fieldRegex = new RegExp(REGISTER_KEY_REGEX(definition.id));
        if (fieldRegex.test(match)) {
          progressSpinner.info(
            `This registration key is already in use, so we have overridden it with the new ${componentName} component.`
          );
          return match.replace(fieldRegex, `${definition.id}: { component: ${componentName} },`);
        } else {
          progressSpinner.info(`Added registration for the new ${componentName} component in the mapper.`);
          const newField = `${definition.id}: { component: ${componentName} },`;
          return match.replace(END_MAPPER_REGEX, `${newField}}`);
        }
      });

    const relativePath = path.relative(process.cwd(), destinationPath);
    await fs.promises.writeFile(destinationPath, await formatWithPrettier(`${updatedData}`));
    await runCmdCommand(`npx next lint --file ${relativePath} --fix`).catch(() =>
      progressSpinner.fail(
        'Oops, we couldn’t format your mapping file using your lint configuration. Please check it before running.'
      )
    );
    progressSpinner?.succeed(
      `Import of ${componentName} component was successfully added to the ${relativePath} file. Before running, make sure this file is connected to the final resolver.`
    );
  },
};
