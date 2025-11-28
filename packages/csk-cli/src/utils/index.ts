import { exec } from 'child_process';
import fs from 'node:fs';
import path from 'node:path';
import prettier, { Options } from 'prettier';

export const DEFAULT_CONTENT_FOLDERS = [
  'aggregate',
  'componentPattern',
  'dataType',
  'files',
  'projectMapDefinition',
  'redirect',
  'asset',
  'composition',
  'enrichment',
  'locale',
  'projectMapNode',
  'signal',
  'category',
  'compositionPattern',
  'entry',
  'previewUrl',
  'prompt',
  'test',
  'component',
  'contentType',
  'entryPattern',
  'previewViewport',
  'quirk',
  'workflow',
];

export const runCmdCommand = async (command: string): Promise<string> =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error.message);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  });

export const formatWithPrettier = (source: string, option?: Options) =>
  prettier.format(source, {
    parser: 'typescript',
    printWidth: 120,
    singleQuote: true,
    semi: true,
    trailingComma: 'es5',
    tabWidth: 2,
    arrowParens: 'avoid',
    endOfLine: 'auto',
    ...option,
  });

export const getAvailableCSKVariants = (): string[] => {
  const contentPath = path.resolve(process.cwd(), 'content');

  if (!fs.existsSync(contentPath)) {
    return [];
  }

  const folders = fs
    .readdirSync(contentPath, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(dir => dir.name);

  if (folders.some(folder => DEFAULT_CONTENT_FOLDERS.includes(folder))) {
    return [];
  }

  return folders;
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const cleanupProductionFiles = (folders: string[], selectedFolder: string): void => {
  const cwd = process.cwd();

  const configFilesToDelete = folders.map(folder => path.resolve(cwd, `uniform.config.${folder}.ts`));
  configFilesToDelete.forEach(configFile => {
    if (fs.existsSync(configFile)) fs.unlinkSync(configFile);
  });

  const packageJsonPath = path.resolve(cwd, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    if (packageJson.scripts && packageJson.scripts.init) {
      packageJson.scripts['init'] = 'run-s uniform:push uniform:publish';
      packageJson.scripts['uniform:pull'] = 'run-s pull:dex apply:dex pull:content';
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    }
  }

  const contentPath = path.resolve(cwd, 'content');
  const selectedFolderPath = path.resolve(contentPath, selectedFolder);

  if (fs.existsSync(selectedFolderPath)) {
    const items = fs.readdirSync(selectedFolderPath);

    items.forEach(item => {
      const sourcePath = path.join(selectedFolderPath, item);
      const targetPath = path.join(contentPath, item);

      if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
      }

      fs.renameSync(sourcePath, targetPath);
    });
  }

  folders.forEach(folder => {
    const folderPath = path.resolve(contentPath, folder);
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
    }
  });
};
