#!/usr/bin/env node
import fs from 'fs';
import genDiff from '../src';

const fileBefore = '__tests__/__fixtures__/before.json';
const fileAfter = '__tests__/__fixtures__/after.json';
const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');

test('check step 1', () => {
  expect(genDiff(fileBefore, fileAfter)).toBe(JSON.parse((fs.readFileSync(expected))));
});
