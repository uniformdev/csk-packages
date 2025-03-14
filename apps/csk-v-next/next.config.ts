import { NextConfig } from 'next';
import { withUniformConfig } from '@uniformdev/canvas-next-rsc/config';

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  // assetPrefix: 'https://website-digital-experience-assembly.vercel.app',
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '*' }],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
  },
};

export default withUniformConfig(nextConfig);
