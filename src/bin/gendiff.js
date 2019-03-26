#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import { version } from '../../package.json';

const compare = (fileBefore, fileAfter) => {
  const contentBefore = JSON.parse(fs.readFileSync(fileBefore));
  const contentAfter = JSON.parse(fs.readFileSync(fileAfter));
  const keysBefore = Object.keys(contentBefore);
  const keysAfter = Object.keys(contentAfter);
  const contentDiff = {};
  const filterPlus = keysAfter.filter(e => !keysAfter.includes(e));
  const filterMinus = keysBefore.filter(e => !keysBefore.includes(e));
  const filterEq = keysAfter.filter(e => keysBefore.includes(e));
  filterEq.forEach((e) => {
    if (contentBefore[e] !== contentAfter[e]) {
      const ePlus = `+ ${e}`;
      const eMinus = `- ${e}`;
      contentDiff[ePlus] = contentAfter[e];
      contentDiff[eMinus] = contentBefore[e];
    }
  });
  filterPlus.forEach((e) => {
    const eMinus = `- ${e}`;
    contentDiff[eMinus] = contentBefore[e];
  });
  filterMinus.forEach((e) => {
    const ePlus = `+ ${e}`;
    contentDiff[ePlus] = contentAfter[e];
  });
  console.log(contentDiff);
};

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .command('compare <pathToFileBefore> <pathToFileAfter>')
  .action((pathToFileBefore, pathToFileAfter) => compare(pathToFileBefore, pathToFileAfter))
  .parse(process.argv);
