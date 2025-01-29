#!/usr/bin/env node
/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

import('./dist/index.mjs').catch(err => {
  console.error(err);
  process.exit(1);
});
