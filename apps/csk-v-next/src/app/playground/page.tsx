import { UniformPlayground, UniformPlaygroundProps } from '@uniformdev/canvas-next-rsc';
import resolveComponent from '@/components';
import { ThemePackProvider } from '@/providers';

export default async function PlaygroundPage(props: { searchParams: UniformPlaygroundProps['searchParams'] }) {
  return (
    <ThemePackProvider>
      <UniformPlayground {...props} resolveComponent={resolveComponent} />
    </ThemePackProvider>
  );
}
