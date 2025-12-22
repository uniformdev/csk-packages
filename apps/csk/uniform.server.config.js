/** @type {import('@uniformdev/canvas-next-rsc-v2/config').UniformServerConfig} */
module.exports = {
  //? if (!cookieConsent) {
  //? write('defaultConsent: true,\n');
  //? }
  playgroundPath: '/playground',
  experimental: {
    middlewareRuntimeCache: true,
    quirkSerialization: true,
  },
  defaultConsent: true,
};
