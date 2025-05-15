import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withUniformConfig } from '@uniformdev/canvas-next-rsc/config';
import locales from './src/i18n/locales.json';
const withNextIntl = createNextIntlPlugin();

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '*' }],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
  },
  redirects: async () => {
    return [
      {
        source: '/playground',
        destination: `/${locales.defaultLocale}/playground`,
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(withUniformConfig(nextConfig));
