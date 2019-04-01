const stringify = (obj) => {
  if (obj instanceof Object) {
    return '[complex value]';
  }
  if (typeof (obj) === 'string') {
    return `'${obj}'`;
  }
  return obj;
};

const nodes = {
  added: ({ key, value }) => `Property '${key}' was added with value: ${stringify(value)}`,
  deleted: ({ key }) => `Property '${key}' was removed`,
  changed: ({ key, valueAfter, valueBefore }) => `Prorepty '${key}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`,
  complexData: ({ key, children }, render) => `Property '${key}' ${render(children)}`,
};

const render = data => data
  .filter(e => e.name !== 'unchanged')
  .map(e => nodes[e.name](e, render)).join('\n');

export default render;
