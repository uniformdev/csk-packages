import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withUniformConfig } from '@uniformdev/canvas-next-rsc/config';
const withNextIntl = createNextIntlPlugin();
/** @type {NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '*' }],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
  },
  experimental: {
    ppr: 'incremental',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(withUniformConfig(nextConfig));
