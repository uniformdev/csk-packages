import fs from 'node:fs';
import { CONFIG_FILE_PATH } from '../constants';

const addToConfiguration = (config: Record<string, string>) => {
  if (!fs.existsSync(CONFIG_FILE_PATH)) {
    fs.writeFileSync(CONFIG_FILE_PATH, '{}');
  }
  const configFile = fs.readFileSync(CONFIG_FILE_PATH, 'utf8');
  const configData = JSON.parse(configFile);
  const newConfig = {
    ...configData,
    ...config,
  };
  fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(newConfig, null, 2));
};

export default addToConfiguration;
