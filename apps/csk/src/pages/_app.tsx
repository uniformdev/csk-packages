import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { type RootComponentInstance } from '@uniformdev/canvas';
import { UniformAppProps } from '@uniformdev/context-next';
import { UniformContext } from '@uniformdev/context-react';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/dimensions.css';
import '@/styles/fonts.css';
import '@/styles/borders.css';
import createUniformContext from '@/utils/createUniformContext';

const getManifestFromDOM = () => {
  if (typeof window === 'undefined') {
    return { project: {} };
  }

  const json = document.getElementById('manifest')?.innerHTML;
  return json ? JSON.parse(json) : { project: {} };
};

const App = ({ Component, pageProps, serverUniformContext }: UniformAppProps<{ data: RootComponentInstance }>) => (
  <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <UniformContext context={serverUniformContext ?? createUniformContext(getManifestFromDOM())} outputType="standard">
      <Component {...pageProps} />
    </UniformContext>
  </NextThemeProvider>
);

export default App;
