import fs from 'fs';
import path from 'path';
import {
  DEFAULT_BORDER_VARIANTS,
  DEFAULT_COLOR_PREFIXES,
  DEFAULT_COLOR_VARIANTS,
  DEFAULT_DIMENSION_PREFIXES,
  DEFAULT_DIMENSION_TABLE_PREFIXES,
  DEFAULT_DIMENSION_TABLE_VARIANTS,
  DEFAULT_DIMENSION_VARIANTS,
  DEFAULT_FONT_PREFIXES,
  DEFAULT_FONT_VARIANTS,
} from '../../constants';
import { generalSuccessLog, generateTailwindSafelist } from '../../utils';

const PATH_TO_TAILWIND_CONFIG_FOLDER = path.join(process.cwd(), 'tailwind.config.theme.json');
const PATH_TO_TAIWIND_UTILITY_FOLDER = path.join(process.cwd(), 'tailwind.utilities.json');
const PATH_TO_SAFELIST_FILE = path.join(process.cwd(), 'safelist.txt');

export const generateSafelist = async () => {
  console.info('Start generating tailwind safelist...');
  if (!fs.existsSync(PATH_TO_TAILWIND_CONFIG_FOLDER)) {
    console.error('tailwind.config.json file not found');
    return;
  }

  if (!fs.existsSync(PATH_TO_TAIWIND_UTILITY_FOLDER)) {
    console.error('tailwind.utilities.json file not found');
    return;
  }

  const themeFile = fs.readFileSync(PATH_TO_TAILWIND_CONFIG_FOLDER, 'utf8');
  const utilitiesFile = fs.readFileSync(PATH_TO_TAIWIND_UTILITY_FOLDER, 'utf8');

  const theme = JSON.parse(themeFile || '{}');
  const utilities = JSON.parse(utilitiesFile || '{}');

  const generatedSafelist = generateTailwindSafelist();

  const colorKeys = Object.keys(theme.extend.colors || {});

  if (colorKeys.length) {
    const colorClasses = colorKeys.flatMap(color => {
      const colorClasses = DEFAULT_COLOR_PREFIXES.map(prefix => `${prefix}-${color}`);

      const colorClassesWithVariants = colorClasses.flatMap(className => {
        return DEFAULT_COLOR_VARIANTS.map(variant => `${variant}:${className}`);
      });

      return [...colorClasses, ...colorClassesWithVariants];
    });

    generatedSafelist.push(...colorClasses);
  }

  const dimensionKeys = Object.keys(theme.extend.spacing || {});
  if (dimensionKeys.length) {
    const basicDimensionClasses = dimensionKeys.flatMap(dimension => {
      const dimensionClasses = DEFAULT_DIMENSION_PREFIXES.map(prefix => `${prefix}-${dimension}`);

      const dimensionClassesWithVariants = dimensionClasses.flatMap(className => {
        return DEFAULT_DIMENSION_VARIANTS.map(variant => `${variant}:${className}`);
      });

      return [...dimensionClasses, ...dimensionClassesWithVariants];
    });

    generatedSafelist.push(...basicDimensionClasses);

    const basicTableDimensionClasses = dimensionKeys.flatMap(dimension => {
      const dimensionClasses = DEFAULT_DIMENSION_TABLE_PREFIXES.map(prefix => `${prefix}-${dimension}`);

      const dimensionClassesWithVariants = dimensionClasses.flatMap(className => {
        return DEFAULT_DIMENSION_TABLE_VARIANTS.map(variant => `${variant}:${className}`);
      });

      return [...dimensionClasses, ...dimensionClassesWithVariants];
    });

    generatedSafelist.push(...basicTableDimensionClasses);
  }

  const fontKeys = Object.keys(theme.extend.fontFamily || {});
  if (fontKeys.length) {
    const basicFontClasses = fontKeys.flatMap(font => {
      const fontClasses = DEFAULT_FONT_PREFIXES.map(prefix => `${prefix}-${font}`);

      const fontClassesWithVariants = fontClasses.flatMap(className => {
        return DEFAULT_FONT_VARIANTS.map(variant => `${variant}:${className}`);
      });

      return [...fontClasses, ...fontClassesWithVariants];
    });

    generatedSafelist.push(...basicFontClasses);
  }

  const borderKeys = Object.keys(utilities || {}).map(key => key.substring(1));
  if (borderKeys.length) {
    const basicBorderClasses = borderKeys.flatMap(border => {
      return DEFAULT_BORDER_VARIANTS.map(variant => `${variant}:${border}`);
    });

    generatedSafelist.push(...basicBorderClasses);
  }

  if (generatedSafelist.length) {
    fs.writeFileSync(PATH_TO_SAFELIST_FILE, generatedSafelist.join(' '));
    generalSuccessLog('Tailwind safelist successfully generated');
  } else {
    console.warn('Tailwind safelist is empty');
  }
};
