const render = (data) => {
  const stringify = obj => (obj instanceof Object ? '[complex value]' : obj);

  const updated = data
    .filter(e => e.added_deleted)
    .map(e => `Prorepty '${e.added_deleted.key}' was updated. From '${stringify(e.added_deleted.valueBefore)}' to '${stringify(e.added_deleted.valueAfter)}'`)
    .join('\n');

  const removed = data
    .filter(e => e.deleted)
    .map(e => `Prorepty '${e.deleted.key}' was removed`)
    .join('\n');

  const addedWith = data
    .filter(e => e.added)
    .map(e => `Prorepty '${e.added.key}' was added with value: '${stringify(e.added.value)}'`)
    .join('\n');

  const child = data.filter(e => e.complexData).map(e => e.complexData)
    .map(e => [e.key, render(e.children)]);

  if (child.length === 0) {
    return `${updated}\n${removed}\n${addedWith}`;
  }
  return `${updated}\n${removed}\n${addedWith}\n${child}`;
};

export default render;
