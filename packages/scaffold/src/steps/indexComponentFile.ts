import fs from 'fs';
import * as ora from 'ora';
import path from 'path';
import { confirm, input } from '@inquirer/prompts';
import { FileHandler } from '../types';
import { formatWithPrettier, getComponentNameBasedOnId, getSupportedParameters, runCmdCommand } from '../utils';

const progressSpinner = ora.default();

export const indexComponentFile: FileHandler = {
  path: async ({ definition, pathToCanvasFolder }) => {
    if (!fs.existsSync(pathToCanvasFolder)) {
      pathToCanvasFolder = await input({
        message: `We didn't find custom-canvas folder. Could you please provide path to the custom-canvas folder:`,
        required: true,
        validate: value => {
          if (!fs.existsSync(value)) return 'Path is not valid';
          return true;
        },
      });
    }
    return path.resolve(pathToCanvasFolder, `${getComponentNameBasedOnId(definition?.id)}.tsx`);
  },
  write: async ({ destinationPath, definition }) => {
    const relativePath = path.relative(process.cwd(), destinationPath);
    const componentName = getComponentNameBasedOnId(definition.id);

    if (fs.existsSync(destinationPath)) {
      const shouldOverwrite = await confirm({
        message: `File ${relativePath} already exists, would you like to overwrite it?`,
      });
      if (!shouldOverwrite) {
        console.info(
          `The creation of the ${relativePath} file for the ${componentName} component was skipped. Make sure the existing component exports a React component to connect it to the mapper.`
        );
        return;
      }
    }

    progressSpinner?.start(`Generating ${relativePath} file`);

    const supportedParameters = getSupportedParameters(definition.parameters || []);
    const parameterMappings = supportedParameters?.map(
      parameter => `${parameter.id}?: ${parameter?.handler?.type || 'unknown'};`
    );
    const imports = [
      ...new Set([
        "import { FC } from 'react';",
        "import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';",
        ...supportedParameters
          .map(item => item.handler?.import)
          .filter(Boolean)
          .flat(),
      ]),
    ];
    const uniformProps = [
      ...new Set(['component', ...supportedParameters.flatMap(item => item.handler?.needsProps).filter(Boolean)]),
    ];
    const slotsMapping = definition.slots?.map(({ id }) => id) || [];

    if (slotsMapping.length) {
      imports.push("import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';");
      if (uniformProps.includes('context')) {
        uniformProps.push('slots');
      } else {
        uniformProps.push('context', 'slots');
      }
    }

    const inputSection = imports.join('\n');

    const typeSection = `
    export type ${componentName}Parameters = ${
      parameterMappings.length
        ? `{
      ${parameterMappings.join('\n')}
    };`
        : 'Record<string, never>;'
    }

    export type ${componentName}Props = ComponentProps<${componentName}Parameters${slotsMapping.length ? `, '${slotsMapping.join("' | '")}'` : ''}>;`;

    const componentSection = `
    export const ${componentName}:FC<${componentName}Props> = ({
      ${supportedParameters
        .filter(item => !item.handler?.hide)
        .map(parameter => `${parameter.id},`)
        .join('\n')}
      ${uniformProps.join(',\n')}
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
          ${supportedParameters
            .map(
              parameter =>
                `<li><strong>${parameter.id}: </strong>${parameter?.handler?.render(parameter) || 'unknown'}</li>`
            )
            .join('\n')}
        </ul>
        ${slotsMapping.map(slot => `<UniformSlot data={component} context={context} slot={slots['${slot}']} />`).join('\n')}
      </div>
    );
    `;

    await fs.promises.writeFile(
      destinationPath,
      await formatWithPrettier(`${inputSection}\n${typeSection}\n${componentSection}`)
    );
    await runCmdCommand(`npx next lint --file ${relativePath} --fix`).catch(() =>
      progressSpinner.fail(
        'Oops, we couldn’t format your mapping file using your lint configuration. Please check it before running.'
      )
    );
    progressSpinner?.succeed(`${relativePath} file was successfully generated`);
  },
};
