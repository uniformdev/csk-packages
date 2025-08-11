import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_CONFIG_FILE_PATH, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, parseJson, pushTokenValue, syncSuccessLog } from '../../utils';

export const pushFonts = async () => {
  checkEnvironmentVariable(TOKEN_STYLE_FILE.Fonts, true);

  if (!fs.existsSync(DEFAULT_CONFIG_FILE_PATH)) {
    console.error(
      `No such file with styles: ${DEFAULT_CONFIG_FILE_PATH}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  const configurationContent = fs.readFileSync(path.resolve(DEFAULT_CONFIG_FILE_PATH), 'utf8');

  const configuration = parseJson(configurationContent);

  const fonts = configuration[TOKEN_STYLE_FILE.Fonts];

  if (!fonts) {
    console.error(`No fonts found in ${DEFAULT_CONFIG_FILE_PATH}`);
    return;
  }

  const defaultFont = configuration[TOKEN_STYLE_FILE.DefaultFontKey];

  //await pushTokenValue('setFonts', JSON.stringify(fonts));
  //await pushTokenValue('setDefaultFont', JSON.stringify({ defaultFont }));

  syncSuccessLog(TOKEN_STYLE_FILE.Fonts, 'pushed');
};
