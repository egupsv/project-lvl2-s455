#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output formats: plain')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => (
    console.log(genDiff(firstConfig, secondConfig, program.format))
  ))
  .parse(process.argv);
