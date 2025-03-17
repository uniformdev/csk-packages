import fs from 'node:fs';
import path from 'node:path';
import * as ora from 'ora';
import { formatWithPrettier, getComponentEntries, runCmdCommand } from '.';
import {
  MAPPING_REGEX,
  REGISTER_IMPORT_REGEX,
  REGISTER_KEY_REGEX,
  END_MAPPER_REGEX,
  INITIAL_RESOLVER,
  START_RESOLVER,
} from '../constants';

const updateImports = (content: string, importSection: string, componentName: string, spinner?: ora.Ora): string =>
  content.replace(REGISTER_IMPORT_REGEX, match => {
    if (content.includes(importSection)) {
      spinner?.info(`Import for this component already exists. Skipping for ${componentName}.`);
      return match;
    }
    spinner?.info(`Import for ${componentName} added successfully.`);
    return `${match}\n${importSection}`;
  });

const updateMapping = (content: string, componentId: string, componentName: string, spinner?: ora.Ora): string =>
  content.replace(MAPPING_REGEX, match => {
    const fieldRegex = new RegExp(REGISTER_KEY_REGEX(componentId));
    if (fieldRegex.test(match)) {
      spinner?.info(`Registration key already in use. Overriding with ${componentName}.`);
      return match.replace(fieldRegex, `${componentId}: { component: ${componentName} },`);
    }
    spinner?.info(`Registration for ${componentName} added to the resolver.`);
    const newField = `${componentId}: { component: ${componentName} },`;
    return match.replace(END_MAPPER_REGEX, `${newField}}`);
  });

export const registerCanvasComponents = async (destination: string, components: string[], spinner?: ora.Ora) => {
  try {
    const canvasResolverPath = path.join(destination, 'components', 'canvas', 'index.ts');

    if (!fs.existsSync(canvasResolverPath)) {
      spinner?.fail(
        'Canvas resolver file not found. Please check the main canvas resolver before running to ensure that extracted components are properly added.'
      );
      return;
    }

    const rawCanvasContent = await fs.promises.readFile(canvasResolverPath, 'utf-8');
    const baseCanvasContent = rawCanvasContent === INITIAL_RESOLVER ? START_RESOLVER : rawCanvasContent;
    const componentEntries = getComponentEntries(components);

    const updatedContent = componentEntries.reduce(
      (acc, { componentName, importSection, componentId }) =>
        updateMapping(updateImports(acc, importSection, componentName, spinner), componentId, componentName, spinner),
      baseCanvasContent
    );

    const formattedContent = await formatWithPrettier(updatedContent);
    await fs.promises.writeFile(canvasResolverPath, formattedContent);

    const relativePath = path.relative(process.cwd(), canvasResolverPath);
    await runCmdCommand(`npx next lint --file ${relativePath} --fix`).catch(() =>
      spinner?.fail(
        'Could not format your resolver file using your lint configuration. Please check it before running.'
      )
    );

    spinner?.succeed(`Canvas components successfully registered in ${canvasResolverPath}`);
  } catch (err) {
    spinner?.stop();
    throw err;
  }
};
