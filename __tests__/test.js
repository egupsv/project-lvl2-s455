import fs from 'fs';
import genDiff from '../src';

test.each([
  ['json', 'tree'],
  ['json', 'plain'],
  ['json', 'json'],
  ['yaml', 'tree'],
  ['yaml', 'plain'],
  ['yaml', 'json'],
  ['ini', 'tree'],
  ['ini', 'plain'],
  ['ini', 'json'],
])('check json, yaml, ini', (format, outputFormat) => {
  const pathToFileBefore = `__tests__/__fixtures__/before.${format}`;
  const pathToFileAfter = `__tests__/__fixtures__/after.${format}`;
  const expected = fs.readFileSync(`__tests__/__fixtures__/${outputFormat}/expected.txt`, 'utf-8');
  expect(genDiff(pathToFileBefore, pathToFileAfter, outputFormat)).toBe(expected);
});

test.each([
  ['json', 'tree'],
  ['json', 'plain'],
  ['json', 'json'],
  ['yaml', 'tree'],
  ['yaml', 'plain'],
  ['yaml', 'json'],
  ['ini', 'tree'],
  ['ini', 'plain'],
  ['ini', 'json'],
])('check complex json, yaml, ini', (format, outputFormat) => {
  const pathToFileBefore = `__tests__/__fixtures__/complexbefore.${format}`;
  const pathToFileAfter = `__tests__/__fixtures__/complexafter.${format}`;
  let name;
  if (format === 'ini' && outputFormat === 'json') {
    name = 'complexexpected_ini.txt';
  } else {
    name = 'complexexpected.txt';
  }
  const expected = fs.readFileSync(`__tests__/__fixtures__/${outputFormat}/${name}`, 'utf-8');
  expect(genDiff(pathToFileBefore, pathToFileAfter, outputFormat)).toBe(expected);
});
