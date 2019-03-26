import fs from 'fs';

export default (fileBefore, fileAfter) => {
  const contentBefore = JSON.parse(fs.readFileSync(fileBefore));
  const contentAfter = JSON.parse(fs.readFileSync(fileAfter));
  const keysBefore = Object.keys(contentBefore);
  const keysAfter = Object.keys(contentAfter);
  const arrUnion = keysBefore
    .reduce((acc, e) => (!acc.includes(e) ? [...acc, e] : acc), keysAfter)
    .map(e => [e, contentBefore[e], contentAfter[e]])
    .reduce((acc, e) => {
      if (e[1] === undefined) {
        return [...acc, [`  + ${e[0]}:`, e[2]].join(' ')];
      }
      if (e[2] === undefined) {
        return [...acc, [`  - ${e[0]}:`, e[1]].join(' ')];
      }
      if (e[1] === e[2]) {
        return [...acc, [`    ${e[0]}:`, e[1]].join(' ')];
      }
      return [...acc, [`  + ${e[0]}:`, e[2]].join(' '), [`  - ${e[0]}:`, e[1]].join(' ')];
    }, []);
  return `{\n${arrUnion.join('\n')}\n}`;
};
