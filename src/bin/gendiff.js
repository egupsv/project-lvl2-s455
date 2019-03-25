#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments( '[type]' )
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

