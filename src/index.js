import _ from 'lodash';
import parse from './parsers';

const usePlusOrMinus = (key, before, after) => {
  if (before[key] === undefined) {
    return `  + ${key}: ${after[key]}`;
  }
  if (after[key] === undefined) {
    return `  - ${key}: ${before[key]}`;
  }
  if (before[key] === after[key]) {
    return `    ${key}: ${after[key]}`;
  }
  return `  + ${key}: ${after[key]}\n  - ${key}: ${before[key]}`;
};

export default (filePathBefore, filePathAfter) => {
  const contentBefore = parse(`__tests__/__fixtures__/${filePathBefore}`);
  const contentAfter = parse(`__tests__/__fixtures__/${filePathAfter}`);
  const keysBefore = Object.keys(contentBefore);
  const keysAfter = Object.keys(contentAfter);
  const arrUnion = _.union(keysBefore, keysAfter)
    .map(e => usePlusOrMinus(e, contentBefore, contentAfter));
  return `{\n${arrUnion.join('\n')}\n}`;
};
