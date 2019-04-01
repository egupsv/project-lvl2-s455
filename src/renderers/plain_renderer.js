const stringify = (obj) => {
  if (obj instanceof Object) {
    return '[complex value]';
  }
  if (typeof (obj) === 'string') {
    return `'${obj}'`;
  }
  return obj;
};

const render = (data) => {
  const nodes = {
    added: (({ key, value }) => `Property '${key}' was added with value: ${stringify(value)}`),
    deleted: (({ key }) => `Property '${key}' was removed`),
    changed: (({ key, valueAfter, valueBefore }) => `Prorepty '${key}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`),
    complexData: (({ key, children }) => `Property '${key}' ${render(children)}`),
  };
  return data.filter(e => e.name !== 'unchanged').map(e => nodes[e.name](e)).join('\n');
};


export default render;
