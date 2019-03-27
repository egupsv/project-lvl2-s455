#!/usr/bin/env node
import fs from 'fs';
import genDiff from '../src';

test('check json', () => {
  const pathToFileBefore = 'before.json';
  const pathToFileAfter = 'after.json';
  const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');
  expect(genDiff(pathToFileBefore, pathToFileAfter)).toBe(expected);
});

test('check yaml', () => {
  const pathToFileBefore = 'before.yaml';
  const pathToFileAfter = 'after.yaml';
  const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');
  expect(genDiff(pathToFileBefore, pathToFileAfter)).toBe(expected);
});
