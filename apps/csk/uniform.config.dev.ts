import { uniformConfig } from '@uniformdev/cli/config';

module.exports = uniformConfig({
  preset: 'none',
  config: {
    serialization: {
      directory: './content/dev',
      entitiesConfig: {
        dataType: {},
        component: {},
        contentType: {},
        componentPattern: {},
      },
    },
  },
});
