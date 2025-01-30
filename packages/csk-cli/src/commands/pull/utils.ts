import { CONFIG_FILE, FG_GREEN } from './constants';

export const syncSuccessLog = (token: CONFIG_FILE, mode: 'pushed' | 'pulled') => {
  console.info(FG_GREEN, `The ${token} configuration was successfully ${mode}`);
};
