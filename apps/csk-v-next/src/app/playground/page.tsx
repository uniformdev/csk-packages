import { UniformPlayground, UniformPlaygroundProps } from '@uniformdev/canvas-next-rsc';
import { ThemePackProvider } from '@uniformdev/theme-pack/components';
import resolveComponent from '@/components';

export default async function PlaygroundPage(props: { searchParams: UniformPlaygroundProps['searchParams'] }) {
  return (
    <ThemePackProvider>
      <UniformPlayground {...props} resolveComponent={resolveComponent} />
    </ThemePackProvider>
  );
}

export const dynamic = 'force-dynamic';
