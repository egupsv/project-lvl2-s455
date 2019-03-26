#!/usr/bin/env node
import fs from 'fs';
import gendiff from '../src/bin/gendiff.js';

const fileBefore = '__tests__/__fixtures__/before.json';
const fileAfter = '__tests__/__fixtures__/after.json';
const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');

test('check step 1', () => {
  expect(gendiff(fileBefore, fileAfter)).toBe(JSON.parse((fs.readFileSynce(expected))));
});
