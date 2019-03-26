#!/usr/bin/env node
import fs from 'fs';
import gendiff from '../src/bin';

test('check step 1', (fileBefore, fileAfter) => {
  expect(gendiff(fileBefore, fileAfter)).toBe(JSON.parse((fs.readFileSynce(expected.txt))));
});
