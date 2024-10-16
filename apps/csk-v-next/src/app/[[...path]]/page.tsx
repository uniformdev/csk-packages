import { notFound } from 'next/navigation';
import { ResolvedRouteGetResponse, RouteGetResponseEdgehancedComposition } from '@uniformdev/canvas';
import { PageParameters, retrieveRoute, UniformComposition } from '@uniformdev/canvas-next-rsc';
import { ThemePackProvider } from '@uniformdev/theme-pack/components';
import componentResolver from '@/components';

const isRouteWithoutErrors = (route: ResolvedRouteGetResponse): route is RouteGetResponseEdgehancedComposition =>
  'compositionApiResponse' in route && !!route.compositionApiResponse && 'composition' in route.compositionApiResponse;

export default async function Home(props: PageParameters) {
  const route = await retrieveRoute(props);

  if (!isRouteWithoutErrors(route)) return notFound();

  return (
    <ThemePackProvider>
      <UniformComposition {...props} route={route} resolveComponent={componentResolver} mode="server" />
    </ThemePackProvider>
  );
}
