import fs from 'fs';

export default (fileBefore, fileAfter) => {
    const contentBefore = JSON.parse(fs.readFileSync(fileBefore));
    const contentAfter = JSON.parse(fs.readFileSync(fileAfter));
    const keysBefore = Object.keys(contentBefore);
    const keysAfter = Object.keys(contentAfter);
    const contentDiff = {};
    const filterPlus = keysAfter.filter(e => !keysBefore.includes(e));
    const filterMinus = keysBefore.filter(e => !keysAfter.includes(e));
    const filterEq = keysAfter.filter(e => keysBefore.includes(e));
    filterEq.forEach((e) => {
      if (contentBefore[e] === contentAfter[e]) {
        contentDiff[e] = contentAfter[e];
      }
      else {
        const ePlus = `+ ${e}`;
        const eMinus = `- ${e}`;
        contentDiff[ePlus] = contentAfter[e];
        contentDiff[eMinus] = contentBefore[e];
      }
    });
    filterPlus.forEach((e) => {
      const ePlus = `+ ${e}`;
      contentDiff[ePlus] = contentAfter[e];
    });
    filterMinus.forEach((e) => {
      const eMinus = `- ${e}`;
      contentDiff[eMinus] = contentBefore[e];
    });
    return (contentDiff);
  };
