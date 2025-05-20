import type { CLIConfiguration } from '@uniformdev/cli';

const config: CLIConfiguration = {
  serialization: {
    entitiesConfig: {
      dataType: {},
      contentType: {},
      entry: { publish: true },
      entryPattern: { publish: true },
      category: { mode: 'createOrUpdate' },
      componentPattern: { publish: true },
      compositionPattern: { publish: true },
      component: { mode: 'createOrUpdate' },
      composition: { publish: true },
      projectMapDefinition: {},
      projectMapNode: {},
      signal: {},
      enrichment: {},
      quirk: {},
      redirect: {},
      aggregate: {},
      test: {},
      asset: {},
      locale: {},
      prompt: {},
      workflow: {},
      previewUrl: {},
      previewViewport: {},
    },
    directory: './content',
    format: 'yaml',
  },
};

module.exports = config;
