import fs from 'fs';
import * as ora from 'ora';
import path from 'path';
import { FileHandler } from '../types';
import { formatWithPrettier, getComponentNameBasedOnId } from '../utils';

const progressSpinner = ora.default();

export const registerComponentFile: FileHandler = {
  path: ({ pathToCanvasFolder }) => path.resolve(pathToCanvasFolder, 'index.ts'),
  write: async ({ destinationPath, definition }) => {
    const componentName = getComponentNameBasedOnId(definition.id);

    progressSpinner?.start(`Generating ${destinationPath} file`);
    const canvasIndex = await fs.promises.readFile(destinationPath, 'utf-8');

    const importFileSection = `import './${componentName}';`;

    const componentFolder = path.join(destinationPath, '..');
    if (!fs.existsSync(componentFolder)) await fs.promises.mkdir(componentFolder, { recursive: true });

    await fs.promises.writeFile(destinationPath, await formatWithPrettier(`${canvasIndex}${importFileSection}`));
    progressSpinner?.succeed(
      `Import of ${componentName} component was successfully added to the  ${destinationPath} file`
    );
  },
};
