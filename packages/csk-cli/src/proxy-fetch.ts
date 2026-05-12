import { setGlobalDispatcher, fetch as undiciFetch, ProxyAgent, RequestInit as UndiciRequestInit } from 'undici';

export function getProxyUrl(explicit?: string): string | undefined {
  return explicit || process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
}

export function createProxyFetch(proxyUrl?: string): typeof fetch {
  if (proxyUrl) console.info(`\u{1F991} Using proxy ${proxyUrl}`);
  const dispatcher = proxyUrl ? new ProxyAgent(proxyUrl) : undefined;
  return ((input: RequestInfo | URL, init?: RequestInit) =>
    undiciFetch(
      input as URL,
      {
        ...(init as UndiciRequestInit),
        dispatcher,
      } as UndiciRequestInit
    )) as unknown as typeof fetch;
}

let configuredProxyUrl: string | undefined;
let cachedFetch: typeof fetch | undefined;

export function setProxyUrl(url: string | undefined): void {
  configuredProxyUrl = url;
  cachedFetch = undefined;
}

export function getConfiguredFetch(): typeof fetch {
  if (cachedFetch) return cachedFetch;
  cachedFetch = createProxyFetch(configuredProxyUrl ?? getProxyUrl());
  return cachedFetch;
}

// Installs a proxy as the global undici dispatcher. Used by the Next.js
// instrumentation hook to patch the runtime transport without replacing
// globalThis.fetch — preserves Next.js's fetch-cache wrapper.
export function applyGlobalProxy(): boolean {
  const proxyUrl = getProxyUrl();
  if (!proxyUrl) return false;
  setGlobalDispatcher(new ProxyAgent(proxyUrl));
  console.info(`[proxy-fetch] Routing fetch through proxy: ${proxyUrl}`);
  return true;
}
