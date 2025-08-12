import { ConnectionOptions } from 'src/types';
import { CONFIG_FILE, DEFAULT_INTEGRATION_URL, FG_GREEN, CONFIGURATION_KEYS, CONFIG_FILE_PATH } from '../constants';

export { generateTailwindcssSource } from './generateTailwindcssPatterns';

export { getTokenStyles, getRootSimpleTokensValue, getRootBordersValue } from './getTokenStyles';

export const checkEnvironmentVariable = (isForce: boolean = false) => {
  if (!isForce && process.env.DEV_MODE === 'true') {
    console.info(`Skip fetch ${CONFIG_FILE_PATH} from integration in dev mode`);
    return false;
  }

  return true;
};

export const checkConnectionOptions = (connectionOptions: ConnectionOptions) => {
  if (!connectionOptions.apiKey) {
    throw new Error('No api key provided');
  }
  if (!connectionOptions.apiHost) {
    throw new Error('No api host provided');
  }
  if (!connectionOptions.project) {
    throw new Error('No project id provided');
  }
  return true;
};

export const fetchTokenValue = (endPoint: string, connectionOptions: ConnectionOptions, ...queryParams: string[]) =>
  fetch(
    `${process.env.INTEGRATION_URL || DEFAULT_INTEGRATION_URL}/api/${endPoint}?projectId=${connectionOptions.project}${queryParams.length ? `&${queryParams.join('&')}` : ''}`,
    { cache: 'no-cache' }
  ).then(response => {
    if (!response.ok) {
      throw `${response.status} ${response.statusText}`;
    }
    if (response.status === 204) {
      throw `${response.status} ${response.statusText}: It looks like the current token configuration hasn't been set up yet.`;
    }
    return response;
  });

export const pushTokenValue = (endPoint: string, body: BodyInit | null, connectionOptions: ConnectionOptions) =>
  fetch(
    `${process.env.INTEGRATION_URL || DEFAULT_INTEGRATION_URL}/api/${endPoint}?projectId=${connectionOptions.project}&baseUrl=${connectionOptions.apiHost}`,
    {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'x-api-key': connectionOptions.apiKey || '',
        'Content-Type': 'application/json',
      },
      body,
    }
  ).then(response => {
    if (!response.ok) {
      throw `${response.status} ${response.statusText}`;
    }
    return response;
  });

export const syncSuccessLog = (token: CONFIGURATION_KEYS | CONFIG_FILE, mode: 'pushed' | 'pulled' | 'applied') => {
  console.info(FG_GREEN, `The ${token} configuration was successfully ${mode}`);
};

export function parseJson(str: string) {
  try {
    return JSON.parse(str);
  } catch {
    throw new Error(`Invalid JSON: ${str}`);
  }
}
