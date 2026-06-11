import type { Preview } from '@storybook/nextjs';
import '../src/styles/globals.css';
import '../src/styles/colors.css';
import '../src/styles/dimensions.css';
import '../src/styles/fonts.css';
import '../src/styles/borders.css';

// The Uniform SDK's UniformContext fetches the Context manifest while rendering a composition.
// Stories use fake data and no real API key, so intercept that request and return an empty
// manifest. All other requests pass through untouched.
type MockableFetch = typeof window.fetch & { __uniformMock?: boolean };

if (typeof window !== 'undefined' && !(window.fetch as MockableFetch).__uniformMock) {
  const originalFetch = window.fetch.bind(window);
  const mockFetch: MockableFetch = (input, init) => {
    const url = typeof input === 'string' ? input : input instanceof Request ? input.url : String(input);
    if (url.includes('/api/v2/manifest')) {
      return Promise.resolve(
        new Response(JSON.stringify({ project: { pz: { sig: {}, enr: {}, agg: {} }, test: {} } }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );
    }
    return originalFetch(input, init);
  };
  mockFetch.__uniformMock = true;
  window.fetch = mockFetch;
}

const preview: Preview = {
  parameters: {
    // Components rendered via UniformComposition use App Router hooks (next/navigation).
    // appDirectory: true makes @storybook/nextjs initialize the navigation mock for every
    // story — required for the production build, where it is otherwise not created in time.
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/', query: {} },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
