import fs from 'node:fs';

enum ItemType {
  Folder = 'folder',
  File = 'file',
}
const getItems = (targetPath: string, type: ItemType) =>
  fs
    .readdirSync(targetPath, { withFileTypes: true })
    .filter(entry => (type === ItemType.Folder ? entry.isDirectory() : entry.isFile()))
    .map(dir => dir.name);

export const getFolders = (targetPath: string) => getItems(targetPath, ItemType.Folder);
