import localFont from 'next/font/local';

export const switzer = localFont({
  src: [
    {
      path: './switzer/6IN5WOLRCYP4G4MOCOHOMXNON6Q7MDAR.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './switzer/6XPIMU23OJVRY676OG5YVJMWEHWICATX.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--switzer',
  display: 'swap',
  preload: true,
});

export const customFontVariables = [switzer.variable].join(' ');
