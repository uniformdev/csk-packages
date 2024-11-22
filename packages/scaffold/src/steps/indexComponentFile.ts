import fs from 'fs';
import * as ora from 'ora';
import path from 'path';
import { confirm } from '@inquirer/prompts';
import { FileHandler } from '../types';
import { formatWithPrettier, getComponentNameBasedOnId, getRenderableParameters } from '../utils';

const progressSpinner = ora.default();

export const indexComponentFile: FileHandler = {
  path: ({ definition, pathToCanvasFolder }) =>
    path.resolve(pathToCanvasFolder, getComponentNameBasedOnId(definition?.id), 'index.ts'),
  write: async ({ destinationPath, definition }) => {
    if (fs.existsSync(destinationPath)) {
      const shouldOverwrite = await confirm({
        message: `File ${destinationPath} already exists, would you like to overwrite it?`,
      });
      if (!shouldOverwrite) {
        console.info(`${destinationPath} skipped`);
        return;
      }
    }

    progressSpinner?.start(`Generating ${destinationPath} file`);

    const componentName = getComponentNameBasedOnId(definition.id);
    const renderableParameters = getRenderableParameters(definition.parameters || []);
    const parameterMappings = renderableParameters?.map(
      parameter => `${parameter.id}?: ${parameter?.handler?.type || 'unknown'};`
    );

    const isNeedLinkParamValueType = parameterMappings.find(item => item.includes('LinkParamValue'));
    const isNeedAsseType = parameterMappings.find(item => item.includes('Asset'));
    const isNeedRichTextNodeType = parameterMappings.find(item => item.includes('RichTextNode'));

    const inputSection = `
    import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
    ${isNeedLinkParamValueType ? "import { LinkParamValue } from '@uniformdev/canvas';" : ''}
    ${isNeedAsseType ? "import type { Asset } from '@uniformdev/assets';" : ''}
    ${isNeedRichTextNodeType ? "import { RichTextNode } from '@uniformdev/richtext';" : ''}
    import { ${componentName} } from './${componentName}';
    `;

    const typeSection = `
    export type ${componentName}Props = ComponentProps<{
      ${parameterMappings.join('\n')}
      }>;
    `;

    const registerSection = `
    registerUniformComponent({
      type: '${definition.id}',
      component: ${componentName},
    });
    `;

    const componentFolder = path.join(destinationPath, '..');
    if (!fs.existsSync(componentFolder)) await fs.promises.mkdir(componentFolder, { recursive: true });

    await fs.promises.writeFile(
      destinationPath,
      await formatWithPrettier(`${inputSection}\n${typeSection}\n${registerSection}`)
    );
    progressSpinner?.succeed(`${destinationPath} file was successfully generated`);
  },
};
