import fs from 'fs';
import * as ora from 'ora';
import path from 'path';
import { confirm } from '@inquirer/prompts';
import { FileHandler } from '../types';
import { formatWithPrettier, getComponentNameBasedOnId, getRenderableParameters } from '../utils';

const progressSpinner = ora.default();

export const indexComponentFile: FileHandler = {
  path: ({ definition, pathToCanvasFolder }) =>
    path.resolve(pathToCanvasFolder, `${getComponentNameBasedOnId(definition?.id)}.tsx`),
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

    const isNeedUniformText = parameterMappings.find(item => item.includes('Text'));
    const isNeedLinkParamValueType = parameterMappings.find(item => item.includes('LinkParamValue'));
    const isNeedAssetType = parameterMappings.find(item => item.includes('Asset'));
    const isNeedImage = renderableParameters.find(({ handler }) => handler?.supports.includes('image'));
    const isNeedRichTextNodeType = parameterMappings.find(item => item.includes('RichTextNode'));

    const inputSection = `
    import { FC } from 'react';
    ${isNeedImage || isNeedAssetType ? "import Image from 'next/image';" : ''}
    ${isNeedAssetType ? "import type { Asset } from '@uniformdev/assets';" : ''}
    ${isNeedLinkParamValueType ? `import { LinkParamValue${isNeedAssetType ? ', flattenValues ' : ' '}} from '@uniformdev/canvas';` : ''}
    import { ComponentProps${isNeedUniformText ? ', UniformText ' : ' '}${isNeedRichTextNodeType ? ', UniformRichText ' : ' '}} from '@uniformdev/canvas-next-rsc/component';
    ${isNeedRichTextNodeType ? "import { RichTextNode } from '@uniformdev/richtext';" : ''}
    `;

    const typeSection = `
    export type ${componentName}Parameters = {
      ${parameterMappings.join('\n')}
    };

    export type ${componentName}Props = ComponentProps<${componentName}Parameters>;`;

    const componentSection = `
    export const ${componentName}:FC<${componentName}Props> = ({
      ${renderableParameters
        .filter(item => !item.handler?.hide)
        .map(parameter => `${parameter.id},`)
        .join('\n')}
      context,
      component
    }) => (
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl">${componentName} component</h1>
        <p>
          <strong>Type/Public id:</strong> {component.type}
        </p>
        {!!component?.variant && (
          <p>
            <strong>Selected Variant:</strong> {component?.variant}
          </p>
        )}
        <strong>Parameters:</strong>
        <ul className="list-inside list-disc space-y-1 pl-2">
          ${renderableParameters
            .map(
              parameter =>
                `<li><strong>${parameter.id}: </strong>${parameter?.handler?.render(parameter) || 'unknown'}</li>`
            )
            .join('\n')}
        </ul>
      </div>
    );
    `;

    const componentFolder = path.join(destinationPath, '..');
    if (!fs.existsSync(componentFolder)) await fs.promises.mkdir(componentFolder, { recursive: true });

    await fs.promises.writeFile(
      destinationPath,
      await formatWithPrettier(`${inputSection}\n${typeSection}\n${componentSection}`)
    );
    progressSpinner?.succeed(`${destinationPath} file was successfully generated`);
  },
};
