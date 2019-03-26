#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import { version } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .command('compare <pathToFileBefore> <pathToFileAfter>')
  .action((pathToFileBefore, pathToFileAfter) => genDiff(pathToFileBefore, pathToFileAfter))
  .parse(process.argv);
