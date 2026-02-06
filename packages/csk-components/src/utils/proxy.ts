import { fetch as undiciFetch, ProxyAgent, RequestInit as UndiciRequestInit } from 'undici';

/**
 * Resolves the proxy URL from the HTTPS_PROXY environment variable.
 */
export function getProxyUrl(): string | undefined {
  return process.env.HTTPS_PROXY;
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

// Cached fetch instance for runtime components
let cachedFetch: typeof fetch | undefined;

/**
 * Returns a cached proxy-aware fetch function resolved from environment variables.
 * Intended for runtime components (SSR) where CLI flags are not available.
 */
export function getProxyFetch(): typeof fetch {
  if (cachedFetch) return cachedFetch;
  const proxyUrl = getProxyUrl();
  cachedFetch = createProxyFetch(proxyUrl);
  return cachedFetch;
}
