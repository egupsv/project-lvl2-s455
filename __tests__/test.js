#!/usr/bin/env node
import fs from 'fs';
import genDiff from '../src';

test('check json', () => {
  const pathToFileBefore = '__tests__/__fixtures__/before.json';
  const pathToFileAfter = '__tests__/__fixtures__/after.json';
  const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');
  expect(genDiff(pathToFileBefore, pathToFileAfter)).toBe(expected);
});

test('check yaml', () => {
  const pathToFileBefore = '__tests__/__fixtures__/before.yaml';
  const pathToFileAfter = '__tests__/__fixtures__/after.yaml';
  const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');
  expect(genDiff(pathToFileBefore, pathToFileAfter)).toBe(expected);
});
