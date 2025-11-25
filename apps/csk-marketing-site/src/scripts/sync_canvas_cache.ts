import * as fs from 'fs';
import * as path from 'path';

const generalPattern =
  /^(created|updated|modified|\$schema|# yaml-language-server):.*$\n|^(description: ''\n)|^(previewImageUrl: ''\n)|^(previewImageUrl: >-\n.*$\n)/gm;

const syncPatterns: { [name: string]: RegExp } = {
  skipAssetUrls:
    /^(created|updated|modified|\$schema|# yaml-language-server):.*$\n|^(description: ''\n)|^(previewImageUrl: ''\n)|^(previewImageUrl: >-\n.*$\n)|type: image\n.*\n.*\n.*\n.*\n.*\n.*value: >-\n.*\n/gm,
};
const itemsName = process.argv[2];
const additionalItemsPath = process.argv[3];
const isEqualDiff = process.argv[4] === 'equals';
const syncPattern = syncPatterns[process.argv[4]] || generalPattern;

(async () => {
  if (!itemsName || !additionalItemsPath) {
    console.error(`Please provide itemsName and additionalItemsPath as params\n`);
    return;
  }
  console.info(`Synchronizing ${itemsName} with basic ${itemsName} from the Component Starter Kit\n`);
  const currentDir = path.resolve();
  const pathToBaseItems = path.join(currentDir, '..', 'csk', 'content', 'full', itemsName);
  const pathToAdditionalItems = path.join(currentDir, ...additionalItemsPath.split('/').slice(1));
  const additionalItemsNames = (await fs.promises.readdir(pathToAdditionalItems, { withFileTypes: true }))
    .filter(node => node.isFile())
    .map(item => item.name);
  for (const additionalItemName of additionalItemsNames) {
    const baseItemPath = path.join(pathToBaseItems, additionalItemName);
    if (fs.existsSync(baseItemPath)) {
      const additionalItemPath = path.join(pathToAdditionalItems, additionalItemName);
      const additionalItem = await fs.promises.readFile(additionalItemPath, 'utf-8');
      const baseItem = await fs.promises.readFile(baseItemPath, 'utf-8');

      if (
        isEqualDiff
          ? baseItem === additionalItem
          : baseItem.replace(syncPattern, '') === additionalItem.replace(syncPattern, '')
      ) {
        await fs.promises.rm(additionalItemPath, { recursive: true, force: true });
        console.info('[Delete] ', additionalItemName);
      } else {
        console.info('[Overwrite] ', additionalItemName);
      }
    } else {
      console.info('[Save] ', additionalItemName);
    }
  }
})();
