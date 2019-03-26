#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .command('compare <pathToFileBefore> <pathToFileAfter>')
  .action((pathToFileBefore, pathToFileAfter) => genDiff(pathToFileBefore, pathToFileAfter))
  .parse(process.argv);
