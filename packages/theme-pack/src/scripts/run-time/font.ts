import { TOKEN_FILE } from '../../constants';
import { checkEnvironmentVariable, getIntegrationAPIURL } from '../../utils';

export const getDefaultFont = async (): Promise<string | null> => {
  checkEnvironmentVariable(TOKEN_FILE.Fonts);
  const defaultFontResponse = await fetch(`${getIntegrationAPIURL('getDefaultFont')}`, { cache: 'no-cache' });
  if (!defaultFontResponse.ok) {
    throw `Pull default font: ${defaultFontResponse.status} ${defaultFontResponse.statusText}`;
  }
  const { defaultFont = '' } = await defaultFontResponse.json();

  return defaultFont || null;
};
