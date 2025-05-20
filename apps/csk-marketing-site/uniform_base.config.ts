import type { CLIConfiguration } from '@uniformdev/cli';

const config: CLIConfiguration = {
  serialization: {
    entitiesConfig: {
      category: {},
      component: {},
    },
    directory: './../csk/content',
    format: 'yaml',
  },
};

module.exports = config;
