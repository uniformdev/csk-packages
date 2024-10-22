import fs from 'node:fs';
import path from 'node:path';
import { IS_CANARY_ENVIRONMENT, PATH_TO_STYLE_FOLDER, ROOT_COLOR_SCHEME_KEY, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, pushTokenValue, syncSuccessLog } from '../../utils';
import { getValueWithAlias } from '../../utils/getTokenStyles';

type Theme = Record<string, string>;
type Themes = Record<string, Theme>;

const parseCSS = (cssText: string): Themes => {
  const themes: Themes = {};

  // Split the CSS text by `}` to isolate each block (root or other)
  const blocks = cssText.split('}');

  blocks.forEach(block => {
    if (block.trim()) {
      const [selector, body] = block.split('{').map(part => part.trim());

      if (selector && body) {
        const themeName = selector === ':root' ? ROOT_COLOR_SCHEME_KEY : selector.replace('.', '');

        themes[themeName] = extractVariables(body);
      }
    }
  });

  return themes;
};

const extractVariables = (body: string): Theme => {
  const variables: Theme = {};

  const declarations = body.split(';');

  declarations.forEach(declaration => {
    const [key, value] = declaration.split(':').map(str => str.trim());

    if (key && value) {
      variables[key.replace('--', '')] = getValueWithAlias(value?.trim()?.replace(';', ''));
    }
  });

  return variables;
};

export const pushColors = async () => {
  checkEnvironmentVariable(TOKEN_STYLE_FILE.Colors, true);

  const pathToStyleFile = path.join(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Colors}.css`);

  if (!fs.existsSync(pathToStyleFile)) {
    console.error(`No such file with styles: ${pathToStyleFile}`);
    return;
  }

  const colorsCssFile = fs.readFileSync(path.resolve(pathToStyleFile), 'utf8');

  const palette = parseCSS(colorsCssFile);

  await pushTokenValue('setColors', JSON.stringify(palette), IS_CANARY_ENVIRONMENT);

  syncSuccessLog(TOKEN_STYLE_FILE.Colors, 'pushed');
};
