const render = (data, depth = 1) => {
  const tab = 2;
  const currentTab = tab * depth;
  const plus = data
    .filter(e => e.added)
    .reduce((acc, e) => [...acc, `+ ${e.added.key}: ${e.added.value}`], [])
    .join(`\n${' '.repeat(currentTab)}`) || '';
  const minus = data
    .filter(e => e.deleted)
    .reduce((acc, e) => [...acc, `- ${e.deleted.key}: ${e.deleted.value}`], [])
    .join(`\n${' '.repeat(currentTab)}`) || '';
  const both = data
    .filter(e => e.added_deleted)
    .reduce((acc, e) => [...acc, `+ ${e.added_deleted.key}: ${e.added_deleted.valueAfter}`,
      `- ${e.added_deleted.key}: ${e.added_deleted.valueBefore}`], [])
    .join(`\n${' '.repeat(currentTab)}`) || '';
  const nothing = data
    .filter(e => e.unchanged)
    .reduce((acc, e) => [...acc, `  ${e.unchanged.key}: ${e.unchanged.value}`], [])
    .join(`\n${' '.repeat(currentTab)}`) || '';
  const child = data.filter(e => e.complexData).map(e => e.complexData);
  console.log(child);
  const plain = `{\n${' '
    .repeat(currentTab)}${nothing}\n${' '
    .repeat(currentTab)}${both}\n${' '
    .repeat(currentTab)}${minus}\n${' '
    .repeat(currentTab)}${plus}\n${' '
    .repeat(currentTab- tab)}}`;
  if (child.length === 0) {
    return plain;
  }
  return `{\n${' '.repeat(currentTab)}${child.reduce((acc, e) => [...acc, `${e.key}: `, render(e.children, depth + 1), '\n}\n'], []).join('')}${plain}`;
};

export default render;
