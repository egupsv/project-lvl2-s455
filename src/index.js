import fs from 'fs';
import path from 'path';
import parse from './parsers';
import makeAST from './Astmaker';
import render from './renderers/renderers';

const format = filePath => path.extname(filePath).slice(1);

export default (filePathBefore, filePathAfter, outputFormat) => {
  const contentBefore = parse(format(filePathBefore), fs.readFileSync(filePathBefore, 'utf-8'));
  const contentAfter = parse(format(filePathAfter), fs.readFileSync(filePathAfter, 'utf-8'));
  return render(makeAST(contentBefore, contentAfter), outputFormat);
};
