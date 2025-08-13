import Color, { ColorInstance } from 'color';

export const REGEX_KEY = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
const TOKEN_REF_REGEX = /^\{([\w-]+)\}$/;

export const getColor = (value: string, fallback?: string): ColorInstance | null => {
  try {
    return Color(value);
  } catch {
    return fallback ? getColor(fallback) : null;
  }
};

export const checkTokenKeysWithInvalid = (tokensKey: string[]) => {
  const invalidKeys = tokensKey.filter(key => !new RegExp(REGEX_KEY).test(key));
  return {
    isValid: invalidKeys.length === 0 && [...new Set(tokensKey.filter(Boolean))].length === tokensKey.length,
    invalidKeys,
  };
};

export const checkColorValueKeys = (colorValues: string[], colorMap: Record<string, string>) =>
  colorValues.filter(value => {
    const match = TOKEN_REF_REGEX.exec(value.trim());
    if (match && match[1]) {
      return !colorMap[match[1]];
    }
    return !getColor(value);
  });

export const validateConfigurationEntry = (type: string, entry: Record<string, string>) => {
  const { isValid, invalidKeys } = checkTokenKeysWithInvalid(Object.keys(entry));

  if (!isValid) {
    if (invalidKeys.length > 0) {
      return {
        isValid: false,
        error: `Invalid ${type} keys: ${invalidKeys.join(', ')}`,
      };
    }

    return {
      isValid: false,
      error: `${type} keys must be unique and contain only alphanumeric characters and hyphens`,
    };
  }

  return {
    isValid: true,
  };
};

export const validateColorsConfiguration = (color: Record<string, string>) => {
  const colorsValues = Object.values(color);

  const { isValid, error } = validateConfigurationEntry('colors', color);

  if (!isValid) {
    return {
      isValid: false,
      error,
    };
  }

  const invalidColorsValues = checkColorValueKeys(colorsValues, color);

  if (invalidColorsValues.length > 0) {
    return {
      isValid: false,
      error: `Invalid colors values: ${invalidColorsValues.join(', ')}`,
    };
  }

  return {
    isValid: true,
  };
};

export const validateDimensionsConfiguration = (dimensions: Record<string, string>) => {
  const { isValid, error } = validateConfigurationEntry('dimensions', dimensions);

  if (!isValid) {
    return {
      isValid: false,
      error,
    };
  }

  return {
    isValid: true,
  };
};

export const validateBordersConfiguration = (borders: Record<string, string>) => {
  const { isValid, error } = validateConfigurationEntry('borders', borders);

  if (!isValid) {
    return {
      isValid: false,
      error,
    };
  }

  return {
    isValid: true,
  };
};

export const validateFontsConfiguration = (fonts: Record<string, string>) => {
  const { isValid, error } = validateConfigurationEntry('fonts', fonts);

  if (!isValid) {
    return {
      isValid: false,
      error,
    };
  }

  return {
    isValid: true,
  };
};
