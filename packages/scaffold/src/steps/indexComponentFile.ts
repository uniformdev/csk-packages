import fs from 'fs';
import * as ora from 'ora';
import path from 'path';
import { confirm, input } from '@inquirer/prompts';
import { IMPORTS, UNIFORM_PARAMETERS } from '../constants';
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
    const imports = new Set([
      IMPORTS.REACT,
      IMPORTS.COMPONENT_PROPS,
      ...supportedParameters
        .map(item => item.handler?.import)
        .filter(Boolean)
        .flat(),
    ]);
    const uniformProps = new Set([
      UNIFORM_PARAMETERS.COMPONENT,
      ...supportedParameters.flatMap(item => item.handler?.needsProps).filter(Boolean),
    ]);
    const slotsMapping = definition.slots?.map(({ id }) => id) || [];

    if (slotsMapping.length) {
      imports.add(IMPORTS.UNIFORM_SLOT);
      uniformProps.add(UNIFORM_PARAMETERS.SLOTS);
      uniformProps.add(UNIFORM_PARAMETERS.CONTEXT);
    }

    const totalParameters = Object.keys(definition.parameters || {}).length;
    const detectedParameters = supportedParameters.filter(item => !item.handler?.hide).length;
    const detectedSlots = slotsMapping.length;

    // Sections
    const inputSection = Array.from(imports).join('\n');

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
      ${Array.from(uniformProps).join(',\n')}
    }) => (
      <div className="flex flex-col gap-4 rounded-lg bg-white/25 p-4 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="text-left">
          <h2 className="text-3xl text-black md:text-4xl">Component Name: ${componentName}</h2>
          <p className="text-gray-600">Public ID: {component.type}</p>
        </div>
      </div>

      <h3 className="text-2xl text-black md:text-3xl">Component Variant ID: {component.variant || 'Default'}</h3>

      ${
        detectedParameters
          ? `<div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <h3 className="text-2xl text-black md:text-3xl">Parameters: </h3>
          <div
            className="rounded-full bg-black/10 px-2 py-1"
            title="${detectedParameters} out of ${totalParameters} parameters detected"
          >
            <span> ${detectedParameters} / ${totalParameters}</span>
          </div>
        </div>
        <ul className="list-inside list-disc space-y-1 pl-2">
        ${supportedParameters
          .map(
            parameter =>
              `<li>
                <strong>${parameter.id}: </strong>
                <div>
                ${parameter?.handler?.render(parameter) || 'unknown'}
                </div>
                <div className="flex w-full items-center justify-center py-2">
                  <div className="h-0.5 w-11/12 rounded-full bg-black/10" />
                </div>
              </li>`
          )
          .join('\n')}
        </ul>
      </div>`
          : `<h3 className="text-2xl text-black md:text-3xl">
        Oops, no parameters were detected, or you haven’t added any yet.
      </h3>`
      }

      ${
        detectedSlots
          ? `<div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <h3 className="text-2xl text-black md:text-3xl">Slots: </h3>
          <div className="rounded-full bg-black/10 px-2 py-1" title="${detectedSlots} slots detected">
            <span> ${detectedSlots} </span>
          </div>
        </div>
        <ul className="list-inside list-disc space-y-1 pl-2">
        ${slotsMapping
          .map(
            slot =>
              `<li>
                <strong>${slot}: </strong>
                <div className="min-h-20">
                  <UniformSlot data={component} context={context} slot={slots['${slot}']} />
                </div>
              </li>`
          )
          .join('\n')}
        </ul>
      </div>`
          : `
          <h3 className="text-2xl text-black md:text-3xl">
            Oops, no slots were detected, or you haven’t added any yet.
          </h3>`
      }

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
