import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_TAILWIND_UTILITIES_PATH, TOKEN_FILE } from '../../constants';
import {
  checkEnvironmentVariable,
  getIntegrationAPIURL,
  getRootBordersValue,
  getStylesPath,
  syncSuccessLog,
} from '../../utils';

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
  checkEnvironmentVariable(TOKEN_FILE.Borders);

  const response = await fetch(`${getIntegrationAPIURL('getBorders')}`, { cache: 'no-cache' });

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  const fetchedBorders = await response.json();

  const utilitiesPath = path.resolve(DEFAULT_TAILWIND_UTILITIES_PATH);

  const bordersCssPath = path.resolve(...getStylesPath(), `${TOKEN_FILE.Borders}.css`);

  const utilities = JSON.parse(fs.readFileSync(utilitiesPath, 'utf8'));

  const tailwindcssBorders = generateTailwindcssUtilitiesBorders(fetchedBorders);

  const updatedUtilities = { ...utilities, ...tailwindcssBorders };

  const cssBorders = getRootBordersValue(fetchedBorders);

  fs.writeFileSync(utilitiesPath, JSON.stringify(updatedUtilities, null, 2), 'utf8');

  fs.writeFileSync(bordersCssPath, cssBorders, 'utf8');

  syncSuccessLog(TOKEN_FILE.Borders, 'pulled');
};
