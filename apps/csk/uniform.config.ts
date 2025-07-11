import { uniformConfig } from '@uniformdev/cli/config';

module.exports = uniformConfig({
  preset: 'all',
  overrides: {
    serializationConfig: { directory: './content-json', format: 'json' },
  },
  // you can disable specific entities from being included, which can speed up your sync
  // disableEntities: ['asset']
});
