import { UniformPlayground, UniformPlaygroundProps } from '@uniformdev/canvas-next-rsc';
import resolveComponent from '@/components';
import { ThemePackProvider } from '@trsergey/theme-pack/components';

export default async function PlaygroundPage(props: { searchParams: UniformPlaygroundProps['searchParams'] }) {
  return (
    <ThemePackProvider>
      <UniformPlayground {...props} resolveComponent={resolveComponent} />
    </ThemePackProvider>
  );
}
