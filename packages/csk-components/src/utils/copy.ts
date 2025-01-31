import fs from 'node:fs';
import path from 'node:path';

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
