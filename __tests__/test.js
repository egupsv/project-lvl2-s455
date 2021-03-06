import fs from 'fs';
import genDiff from '../src';

test.each([
  ['json', 'tree'],
  ['json', 'plain'],
  ['yaml', 'tree'],
  ['yaml', 'json'],
  ['ini', 'plain'],
  ['ini', 'json'],
])('check json, yaml, ini', (format, outputFormat) => {
  const pathToFileBefore = `__tests__/__fixtures__/before.${format}`;
  const pathToFileAfter = `__tests__/__fixtures__/after.${format}`;
  const expected = fs.readFileSync(`__tests__/__fixtures__/${outputFormat}/expected.txt`, 'utf-8');
  expect(genDiff(pathToFileBefore, pathToFileAfter, outputFormat)).toBe(expected);
});

test.each([
  ['json', 'plain'],
  ['json', 'json'],
  ['yaml', 'tree'],
  ['yaml', 'json'],
  ['ini', 'tree'],
  ['ini', 'plain'],
])('check complex json, yaml, ini', (format, outputFormat) => {
  const pathToFileBefore = `__tests__/__fixtures__/complexbefore.${format}`;
  const pathToFileAfter = `__tests__/__fixtures__/complexafter.${format}`;
  const expected = fs.readFileSync(`__tests__/__fixtures__/${outputFormat}/complexexpected.txt`, 'utf-8');
  expect(genDiff(pathToFileBefore, pathToFileAfter, outputFormat)).toBe(expected);
});
