#!/usr/bin/env node
require('dotenv').config();

import('./dist/index.mjs').catch(err => {
  console.error(err);
  process.exit(1);
});
