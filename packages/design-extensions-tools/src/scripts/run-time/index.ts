import { ConnectionOptions } from 'src/types';
import { checkConnectionOptions, checkEnvironmentVariable, fetchTokenValue, getTokenStyles } from '../../utils';
import { getColorTokensValue, getRootBordersValue } from '../../utils/getTokenStyles';

interface TokenConfig {
  colors: string;
  dimensions: string;
  defaultFont: string | undefined;
  borders: string;
}

export const getTokenConfiguration = async (): Promise<TokenConfig | undefined> => {
  const connectionOptions: ConnectionOptions = {
    apiKey: process.env.UNIFORM_API_KEY || '',
    apiHost: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
    project: process.env.UNIFORM_PROJECT_ID || '',
  };

  if (!checkEnvironmentVariable()) {
    return;
  }

  if (!checkConnectionOptions(connectionOptions)) return;

  const configurationResponse = await fetchTokenValue('getConfiguration', connectionOptions);

  const { colors, dimensions, defaultFont, borders } = await configurationResponse.json();

  return {
    colors: getTokenStyles(colors, getColorTokensValue),
    dimensions: getTokenStyles(dimensions),
    defaultFont,
    borders: getTokenStyles(borders, getRootBordersValue),
  };
};
