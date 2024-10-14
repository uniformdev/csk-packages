import { TOKEN_FILE } from '../../constants';
import { checkEnvironmentVariable, getIntegrationAPIURL, getTokensStyles } from '../../utils';

export const getDimensions = async () => {
  checkEnvironmentVariable(TOKEN_FILE.Dimensions);
  const dimensionsResponse = await fetch(`${getIntegrationAPIURL('getDimensions')}`, { cache: 'no-cache' });
  if (!dimensionsResponse.ok) {
    throw `Pull dimension configuration: ${dimensionsResponse.status} ${dimensionsResponse.statusText}`;
  }
  const dimensions = await dimensionsResponse.json();

  return getTokensStyles(dimensions);
};
