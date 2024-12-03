// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withUniformConfig } = require('@uniformdev/canvas-next-rsc/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*' },
      {
        protocol: 'https',
        hostname: 'uniform.global',
      },
    ],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
  },
};

module.exports = withUniformConfig(nextConfig);
