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

// Module-level state for CLI proxy configuration
let configuredProxyUrl: string | undefined;
let cachedFetch: typeof fetch | undefined;

/**
 * Sets the proxy URL for the module. Called from the CLI preAction hook.
 */
export function setProxyUrl(proxyUrl: string | undefined): void {
  configuredProxyUrl = proxyUrl;
  cachedFetch = undefined; // Invalidate cache when proxy changes
}

/**
 * Returns a cached proxy-aware fetch function.
 * Uses the proxy URL set via setProxyUrl(), falling back to getProxyUrl().
 */
export function getConfiguredFetch(): typeof fetch {
  if (cachedFetch) return cachedFetch;
  const proxyUrl = configuredProxyUrl ?? getProxyUrl();
  cachedFetch = createProxyFetch(proxyUrl);
  return cachedFetch;
}
