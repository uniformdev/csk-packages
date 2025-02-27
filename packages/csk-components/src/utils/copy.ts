import fs from 'node:fs';
import path from 'node:path';
import * as ora from 'ora';
import { FILE_EXTENSIONS, IMPORT_REGEX, SOURCE_CANVAS_FILES } from '@/constants';
import { confirm } from '@inquirer/prompts';

const ensureDir = async (dir: string) => {
  if (!fs.existsSync(dir)) {
    await fs.promises.mkdir(dir, { recursive: true });
  }
};

const copyFolder = async (source: string, destination: string) => {
  await ensureDir(destination);

  const entries = await fs.promises.readdir(source, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      await copyFolder(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
};

export const copyFolders = async (source: string, destination: string, folders: string[]) => {
  try {
    await ensureDir(destination);

    for (const folder of folders) {
      const srcFolder = path.join(source, folder);
      const destFolder = path.join(destination, folder);

      if (fs.existsSync(srcFolder)) {
        await copyFolder(srcFolder, destFolder);
        console.info(`✅ Copied: ${path.relative(process.cwd(), destFolder)}`);
      } else {
        console.warn(`⚠️ Folder not found: ${path.relative(process.cwd(), srcFolder)}`);
      }
    }
  } catch (err) {
    console.error('❌ Error copying folders:', err);
  }
};

export const copyFiles = async (source: string, destination: string, files: string[]) => {
  try {
    await ensureDir(destination);

    for (const file of files) {
      const srcFile = path.join(source, file);
      const destFile = path.join(destination, file);

      if (fs.existsSync(srcFile)) {
        await fs.promises.copyFile(srcFile, destFile);
        console.info(`✅ Copied: ${path.relative(process.cwd(), destFile)}`);
      } else {
        console.warn(`⚠️ File not found: ${path.relative(process.cwd(), srcFile)}`);
      }
    }
  } catch (err) {
    console.error('❌ Error copying files:', err);
  }
};

const getImportedFilePath = (subPath: string) => {
  const directFile = FILE_EXTENSIONS.find(ext => fs.existsSync(subPath + ext));
  if (directFile) return subPath + directFile;

  const indexFile = FILE_EXTENSIONS.find(ext => fs.existsSync(path.join(subPath, `index${ext}`)));
  if (indexFile) return path.join(subPath, `index${indexFile}`);

  return undefined;
};

const getDependenciesFilePaths = (sourceFile: string) => {
  const content = fs.readFileSync(sourceFile, 'utf8');
  const imports = content.match(IMPORT_REGEX)?.map(importPath => importPath.replace(/['"]/g, ''));

  const aliases = imports
    ?.filter(importPath => importPath.startsWith('@/'))
    .map(importPath => importPath.replace('@/', ''));
  const relativePaths = imports?.filter(importPath => !importPath.startsWith('@/')).map(importPath => importPath);
  return { aliases, relativePaths };
};

const findImportedFiles = async (sourceFile: string, targetPath: string, importsState: Set<string>) => {
  importsState.add(sourceFile);
  const { aliases = [], relativePaths = [] } = getDependenciesFilePaths(sourceFile);

  if (aliases.length) {
    for (const alias of aliases) {
      const subPath = getImportedFilePath(path.join(targetPath, alias));
      if (subPath && !importsState.has(subPath)) {
        await findImportedFiles(subPath, targetPath, importsState);
      }
    }
  }

  if (relativePaths.length) {
    for (const relative of relativePaths) {
      const subPath = getImportedFilePath(path.join(path.dirname(sourceFile), relative));
      if (subPath && !importsState.has(subPath)) {
        await findImportedFiles(subPath, targetPath, importsState);
      }
    }
  }
  return;
};

export const copyCanvasComponentsWithDependencies = async (
  source: string,
  destination: string,
  folders: string[],
  targetPath: string,
  spinner?: ora.Ora
) => {
  const importsState = new Set<string>();

  spinner?.start('Searching for all canvas components and their dependencies...');

  for (const entry of folders) {
    const srcPath = path.join(source, entry);
    const itemsToCopy = fs
      .readdirSync(srcPath, { withFileTypes: true })
      .filter(item => item.isFile() && SOURCE_CANVAS_FILES.includes(item.name));

    for (const item of itemsToCopy) {
      await findImportedFiles(path.join(item.parentPath, item.name), targetPath, importsState);
    }
  }
  const filePathsToExtract = Array.from(importsState);

  const filePathsToOverride = filePathsToExtract.filter(sourceFile => {
    const destPath = path.join(destination, path.relative(targetPath, sourceFile));
    return fs.existsSync(destPath) && fs.readFileSync(destPath, 'utf8') !== fs.readFileSync(sourceFile, 'utf8');
  });

  const shouldOverride = await (async () => {
    if (!filePathsToOverride.length) return true;
    spinner?.stop();
    const previewPaths = filePathsToOverride
      .slice(0, 5)
      .map(filePath => path.relative(process.cwd(), path.join(destination, path.relative(targetPath, filePath))))
      .join('\n\t');
    const additionalFiles = filePathsToOverride.length > 5 ? '\n\t...' : '';

    return confirm({
      message: `Found ${filePathsToOverride.length} files that will be overridden:\n\t${previewPaths}${additionalFiles}\nDo you want to override them?`,
    });
  })();

  const finalFilePathsToExtract = shouldOverride
    ? filePathsToExtract
    : filePathsToExtract.filter(filePath => !filePathsToOverride.includes(filePath));

  spinner?.start('Extracting canvas components and their dependencies...');

  for (const filePath of finalFilePathsToExtract) {
    const destPath = path.join(destination, path.relative(targetPath, filePath));
    await ensureDir(path.dirname(destPath));
    await fs.promises.copyFile(filePath, destPath);
  }
};
