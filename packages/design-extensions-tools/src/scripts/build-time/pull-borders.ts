import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_TAILWIND_UTILITIES_PATH, TOKEN_STYLE_FILE, PATH_TO_STYLE_FOLDER } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, getRootBordersValue, syncSuccessLog } from '../../utils';

const generateTailwindcssUtilitiesBorders = (
  borders: Record<string, { color: string; width: string; radius: string; style: string }>
) =>
  Object.keys(borders).reduce((acc, borderKey) => {
    return {
      ...acc,
      [`.${borderKey}`]: {
        borderStyle: `var(--${borderKey}-style)`,
        borderRadius: `var(--${borderKey}-radius)`,
        borderWidth: `var(--${borderKey}-width)`,
        borderColor: `var(--${borderKey}-color)`,
      },
    };
  }, {});

export const buildBorders = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Borders)) return;

  if (!fs.existsSync(PATH_TO_STYLE_FOLDER)) {
    console.error(
      `No such directory for style files: ${PATH_TO_STYLE_FOLDER}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  const response = await fetchTokenValue('getBorders');

  const fetchedBorders = await response.json();

  const utilitiesPath = path.resolve(DEFAULT_TAILWIND_UTILITIES_PATH);

  const bordersCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Borders}.css`);

  const utilities = !fs.existsSync(utilitiesPath)
    ? undefined
    : JSON.parse(fs.readFileSync(utilitiesPath, 'utf8') || '{}');

  const tailwindcssBorders = generateTailwindcssUtilitiesBorders(fetchedBorders);

  const updatedUtilities = { ...utilities, ...tailwindcssBorders };

  const cssBorders = getRootBordersValue(fetchedBorders);

  fs.writeFileSync(utilitiesPath, JSON.stringify(updatedUtilities, null, 2), 'utf8');

  fs.writeFileSync(bordersCssPath, cssBorders, 'utf8');

  syncSuccessLog(TOKEN_STYLE_FILE.Borders, 'pulled');
};
