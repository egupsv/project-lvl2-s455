import fs from 'fs';
import genDiff from '../src';

test.each(['json', 'yaml', 'ini'])('check json, yaml, ini', (format) => {
  const pathToFileBefore = `__tests__/__fixtures__/before.${format}`;
  const pathToFileAfter = `__tests__/__fixtures__/after.${format}`;
  const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');
  expect(genDiff(pathToFileBefore, pathToFileAfter)).toBe(expected);
});

test.each(['json', 'yaml', 'ini'])('check complex json, yaml, ini', (format) => {
  const pathToFileBefore = `__tests__/__fixtures__/complexbefore.${format}`;
  const pathToFileAfter = `__tests__/__fixtures__/complexafter.${format}`;
  const expected = fs.readFileSync('__tests__/__fixtures__/complexexpected.txt', 'utf-8');
  expect(genDiff(pathToFileBefore, pathToFileAfter)).toBe(expected);
});
