const render = (data) => {
  const plus = data
    .filter(e => e.added)
    .reduce((acc, e) => [...acc, `  + ${e.added.key}: ${e.added.value}`], [])
    .join('\n') || '';
  const minus = data
    .filter(e => e.deleted)
    .reduce((acc, e) => [...acc, `  - ${e.deleted.key}: ${e.deleted.value}`], [])
    .join('\n') || '';
  const both = data
    .filter(e => e.added_deleted)
    .reduce((acc, e) => [...acc, `  + ${e.added_deleted.key}: ${e.added_deleted.valueAfter}`,
      `  - ${e.added_deleted.key}: ${e.added_deleted.valueBefore}`], [])
    .join('\n') || '';
  const nothing = data
    .filter(e => e.unchanged)
    .reduce((acc, e) => [...acc, `    ${e.unchanged.key}: ${e.unchanged.value}`], [])
    .join('\n') || '';
  const child = data.filter(e => e.complexData).map(e => e.complexData);
  console.log(child);
  if (child.length === 0) {
    return `{\n${nothing}\n${both}\n${minus}\n${plus}\n}`;
  }
  return `  ${child.reduce((acc, e) => [...acc, `${e.key}: {\n`, render(e.children), '\n}'], []).join('')}\n${nothing}\n${both}\n${minus}\n${plus}\n`;
};

export default render;
