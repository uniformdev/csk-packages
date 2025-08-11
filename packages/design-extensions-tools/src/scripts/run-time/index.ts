import { checkEnvironmentVariable, fetchTokenValue, getTokenStyles } from '../../utils';
import { getColorTokensValue, getRootBordersValue } from '../../utils/getTokenStyles';

interface TokenConfig {
  colors: string;
  dimensions: string;
  defaultFont: string | undefined;
  borders: string;
}

export const getTokenConfiguration = async (): Promise<TokenConfig | undefined> => {
  if (!checkEnvironmentVariable()) {
    return;
  }

  const configurationResponse = await fetchTokenValue('getConfiguration');

  const { colors, dimensions, defaultFont, borders } = await configurationResponse.json();

  return {
    colors: getTokenStyles(colors, getColorTokensValue),
    dimensions: getTokenStyles(dimensions),
    defaultFont,
    borders: getTokenStyles(borders, getRootBordersValue),
  };
};
