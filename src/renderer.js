const render = (data, depth = 1) => {
  const tab = 4;
  const currentTab = tab * depth;

  const stringify = obj => (obj instanceof Object ? Object.keys(obj)
    .reduce((acc, e, i) => [...acc, `{\n${' '.repeat(currentTab + tab)}${e}: ${Object.values(obj)[i]}\n${' '.repeat(currentTab)}}`], [])
    .join('\n') : obj);

  const arrPlus = data
    .filter(e => e.added)
    .reduce((acc, e) => [...acc, `+ ${e.added.key}: ${stringify(e.added.value)}`], []);
  const plus = arrPlus.length === 0 ? '' : `${' '.repeat(currentTab - 2)}${arrPlus
    .join(`\n${' '.repeat(currentTab - 2)}`)}\n`;

  const arrMinus = data
    .filter(e => e.deleted)
    .reduce((acc, e) => [...acc, `- ${e.deleted.key}: ${stringify(e.deleted.value)}`], []);
  const minus = arrMinus.length === 0 ? '' : `${' '.repeat(currentTab - 2)}${arrMinus
    .join(`\n${' '.repeat(currentTab - 2)}`)}\n`;

  const arrBoth = data
    .filter(e => e.added_deleted)
    .reduce((acc, e) => [...acc, `+ ${e.added_deleted.key}: ${stringify(e.added_deleted.valueAfter)}`,
      `- ${e.added_deleted.key}: ${stringify(e.added_deleted.valueBefore)}`], []);
  const both = arrBoth.length === 0 ? '' : `${' '.repeat(currentTab - 2)}${arrBoth
    .join(`\n${' '.repeat(currentTab - 2)}`)}\n`;

  const arrNothing = data
    .filter(e => e.unchanged)
    .reduce((acc, e) => [...acc, `${e.unchanged.key}: ${stringify(e.unchanged.value)}`], []);
  const nothing = arrNothing.length === 0 ? '' : `${' '.repeat(currentTab)}${arrNothing
    .join(`\n${' '.repeat(currentTab)}`)}\n`;

  const child = data.filter(e => e.complexData).map(e => e.complexData);
  const plain = `${nothing}${both}${minus}${plus}${' '
    .repeat(currentTab - tab)}`;
  if (child.length === 0) {
    return `{\n${plain}}`;
  }
  return `{\n${' '.repeat(currentTab)}${child
    .reduce((acc, e) => [...acc, `${e.key}: `, render(e.children, depth + 1), '\n', `${' '.repeat(currentTab)}`], [])
    .slice(0, -1)
    .join('')}${plain}}`;
};

export default render;
