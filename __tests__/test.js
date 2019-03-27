#!/usr/bin/env node
import fs from 'fs';
import genDiff from '../src';

test.each(['json', 'yaml', 'ini'])('check json, yaml, ini', (format) => {
  const pathToFileBefore = `before.${format}`;
  const pathToFileAfter = `after.${format}`;
  const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');
  expect(genDiff(pathToFileBefore, pathToFileAfter)).toBe(expected);
});
