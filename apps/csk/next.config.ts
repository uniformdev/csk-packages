import { NextConfig } from 'next';
//? if (localization) {
import createNextIntlPlugin from 'next-intl/plugin';
//? }
import { withUniformConfig } from '@uniformdev/canvas-next-rsc-v2/config';
//? if (localization) {
const withNextIntl = createNextIntlPlugin();
//? }

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '*' }],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
  },
};

//? if (localization) {
export default withNextIntl(withUniformConfig(nextConfig));
//? }
//? if (!localization) {
//? write('export default withUniformConfig(nextConfig);\n');
//? }
