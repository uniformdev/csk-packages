import { ComponentInstance, RouteGetResponseEdgehancedComposition } from '@uniformdev/canvas';
import { AppDirectoryServerContext } from '@uniformdev/canvas-next-rsc-shared';

export const fakeContext: AppDirectoryServerContext = {
  get scores(): Readonly<{ [key: string]: number }> {
    return {};
  },
  get quirks(): Readonly<{ [key: string]: string }> {
    return {};
  },
  internal_update: async () => {},
  getTestVariantId: () => null,
  setTestVariantId: async () => {},
  log: () => {},
  forget: async () => {},
  internal_processTestEvent: () => {},
  internal_processPersonalizationEvent: () => {},
  /* eslint-disable */
  test: (): any => {},
  getServerToClientTransitionState: (): any => {},
  personalize: (): any => {},
  manifest: {} as any,
  events: {} as any,
  updateConsent: (): Promise<void> => Promise.resolve(),
  consent: false,
  /* eslint-enable */
};

interface UniformMockParam {
  type: string;
  value: Record<string, unknown>;
}

export const createUniformParameter = (params: Record<string, unknown | UniformMockParam>) =>
  Object.keys(params).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        type: (params[key] as UniformMockParam)?.type || 'text',
        value: (params[key] as UniformMockParam)?.value || params[key],
      },
    }),
    {}
  );

export const createFakeCompositionData = (
  type: string,
  variant: string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, any>,
  slots?: Record<string, ComponentInstance[]>
): RouteGetResponseEdgehancedComposition => ({
  type: 'composition',
  matchedRoute: '/',
  dynamicInputs: {},
  compositionApiResponse: {
    composition: {
      _name: 'Example',
      _id: 'd2aa1555-88e8-4640-9316-b82c03cb6f33',
      type,
      variant,
      parameters: createUniformParameter(params),
      slots,
    },
    projectId: '3f07fd59-d90c-4f67-bbf8-efffc4a2ee96',
    state: 63,
    created: '2024-09-01T13:09:16.471314+00:00',
    modified: '2024-09-01T13:27:52.974122+00:00',
    pattern: false,
  },
});
