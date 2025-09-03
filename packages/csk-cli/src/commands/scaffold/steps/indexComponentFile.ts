import fs from 'fs';
import * as ora from 'ora';
import path from 'path';
import { confirm, input } from '@inquirer/prompts';
import { formatWithPrettier, runCmdCommand } from '../../../utils';
import { IMPORTS, UNIFORM_PARAMETERS, UNIFORM_PARAMETERS_TYPES } from '../constants';
import { FileHandler } from '../types';
import { getComponentNameBasedOnId, getSupportedParameters } from '../utils';

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
    try {
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
        ({ id, overriddenId, handler }) => `${overriddenId ? `'${id}'` : id}?: ${handler?.type || 'unknown'};`
      );
      const imports = new Set([
        IMPORTS.REACT,
        IMPORTS.COMPONENT_PROPS,
        IMPORTS.WITH_FLATTEN_PARAMETERS,
        ...supportedParameters
          .map(item => item.handler?.import)
          .filter(Boolean)
          .flat(),
      ]);
      const uniformProps = new Set([
        UNIFORM_PARAMETERS.CONTEXT,
        UNIFORM_PARAMETERS.VARIANT,
        ...supportedParameters.flatMap(item => item.handler?.needsProps).filter(Boolean),
      ]);
      const slotsMapping = definition.slots?.map(({ id }) => id) || [];

      if (slotsMapping.length) {
        imports.add(IMPORTS.UNIFORM_SLOT);
        uniformProps.add(UNIFORM_PARAMETERS.SLOTS);
      }

      const assetParameters = supportedParameters
        .filter(item => item.handler?.supports === UNIFORM_PARAMETERS_TYPES.ASSET)
        .map(item => item.id);

      const totalParameters = (definition.parameters || []).filter(({ type }) => type !== 'group').length;
      const detectedParameters = supportedParameters.length;
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

    export type ${componentName}Props = ComponentProps<${componentName}Parameters${slotsMapping.length ? `, '${slotsMapping.join("' | '")}'` : ''}>${assetParameters.length ? `& ReplaceFieldsWithAssets<${componentName}Parameters, '${assetParameters.join("' | '")}'>;` : `& ${componentName}Parameters;`}`;

      const componentSection = `
    const ${componentName}:FC<${componentName}Props> = ({
      ${supportedParameters
        .filter(item => !item.handler?.hideDestructuring)
        .map(({ id, overriddenId }) => `${overriddenId ? `"${id}": ${overriddenId}` : id},`)
        .join('\n')}
      ${Array.from(uniformProps).join(',\n')}
    }) => (
      <div className="flex flex-col gap-4 rounded-lg bg-white/75 p-4 backdrop-blur-sm">

      {/* Header section */}
      <div className="flex flex-col items-center">
        <div className="text-left">
          <h2 className="text-3xl text-black md:text-4xl">Component Name: ${componentName}</h2>
          <p className="text-gray-600">Public ID: {context.type}</p>
        </div>
      </div>

      <h3 className="text-2xl text-black md:text-3xl">Component Variant ID: {variant || 'Default'}</h3>

      {/* Parameters section */}
      ${
        detectedParameters
          ? `<div className="flex flex-col gap-1 text-black">
        <div className="flex items-center gap-1">
          <h3 className="text-2xl text-black md:text-3xl">Parameters: </h3>
          <div
            className="rounded-full bg-black/10 px-2 py-1"
            title="${detectedParameters === totalParameters ? 'All parameters detected' : `${detectedParameters} out of ${totalParameters} parameters detected`}"
          >
            <span> ${detectedParameters === totalParameters ? `${detectedParameters}` : `${detectedParameters} / ${totalParameters}`} </span>
          </div>
        </div>
        <ul className="list-inside list-disc space-y-1 pl-2">
        ${supportedParameters
          .map(
            parameter =>
              `<li>
                <span>
                  Parameter Name: <strong>${parameter.name}</strong>
                </span>
                <p className="text-gray-600">Public ID: ${parameter.id}</p>
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

      {/* Slots section */}
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
                  <UniformSlot slot={slots['${slot}']} />
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


    export default withFlattenParameters(${componentName});
    `;

      await fs.promises.writeFile(
        destinationPath,
        await formatWithPrettier(`${inputSection}\n${typeSection}\n${componentSection}`)
      );
      await runCmdCommand(`npx eslint ${relativePath} --fix`).catch(() =>
        progressSpinner.fail(
          'Oops, we couldn’t format your mapping file using your lint configuration. Please check it before running.'
        )
      );
      progressSpinner?.succeed(`${relativePath} file was successfully generated`);
    } catch (error) {
      progressSpinner.stop();
      throw error;
    }
  },
};
