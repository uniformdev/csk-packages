/** @type {import('@uniformdev/next-app-router/config').UniformServerConfig} */
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
  // canvasCache: {
  //   bypassCache: true,
  // },
  // projectMapCache: {
  //   bypassCache: true,
  // },
  // manifestCache: {
  //   bypassCache: true,
  // },
};
