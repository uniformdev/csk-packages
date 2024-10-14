import { TOKEN_FILE } from '../../constants';
import { checkEnvironmentVariable, getIntegrationAPIURL, getTokensStyles } from '../../utils';

export const getColors = async () => {
  checkEnvironmentVariable(TOKEN_FILE.Colors);
  const colorsResponse = await fetch(`${getIntegrationAPIURL('getColors')}`, { cache: 'no-cache' });
  if (!colorsResponse.ok) {
    throw `Pull color palette: ${colorsResponse.status} ${colorsResponse.statusText}`;
  }
  const colors = await colorsResponse.json();

  return getTokensStyles(colors);
};
