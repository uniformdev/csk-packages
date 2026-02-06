import { fetch as undiciFetch, ProxyAgent, RequestInit as UndiciRequestInit } from 'undici';

/**
 * Resolves the proxy URL from an explicit argument or the HTTPS_PROXY environment variable.
 */
export function getProxyUrl(explicitProxy?: string): string | undefined {
  return explicitProxy || process.env.HTTPS_PROXY;
}

/**
 * Creates a fetch function that routes requests through a proxy when a proxyUrl is provided.
 */
export function createProxyFetch(proxyUrl?: string): typeof fetch {
  if (proxyUrl) {
    console.info(`Using proxy ${proxyUrl}`);
  }

  return (input: RequestInfo | URL, init?: RequestInit) => {
    if (proxyUrl) {
      const wrappedInit: UndiciRequestInit = {
        ...(init as UndiciRequestInit),
        dispatcher: new ProxyAgent(proxyUrl),
      };
      return undiciFetch(input as URL, wrappedInit) as unknown as Promise<Response>;
    }
    return undiciFetch(input as URL, init as UndiciRequestInit) as unknown as Promise<Response>;
  };
}
