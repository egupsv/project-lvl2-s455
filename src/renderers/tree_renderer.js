import _ from 'lodash';

const render = (data, depth = 1) => {
  const tab = 4;
  const currentTab = tab * depth;

  const stringify = obj => {
    if (obj instanceof Object) {
      return Object.keys(obj)
        .reduce((acc, e, i) => [...acc, `{\n${' '
          .repeat(currentTab + tab)}${e}: ${Object.values(obj)[i]}\n${' '
          .repeat(currentTab)}}`], [])
        .join('\n');
    }
    return obj;
  }  

  const nodes = {
    added: (({ key, value }) => `${' '.repeat(currentTab - 2)}+ ${key}: ${stringify(value)}`),
    deleted: (({ key, value }) => `${' '.repeat(currentTab - 2)}- ${key}: ${stringify(value)}`),
    changed: (({ key, valueAfter, valueBefore }) => [`${' '
      .repeat(currentTab - 2)}- ${key}: ${stringify(valueBefore)}`, `${' '
      .repeat(currentTab - 2)}+ ${key}: ${stringify(valueAfter)}`]),
    unchanged: (({ key, value }) => `${' '.repeat(currentTab)}${key}: ${stringify(value)}`),
    complexData: (({ key, children }) => `${' '
      .repeat(currentTab)}${key}: ${render(children, depth + 1)}`),
  };
  return `{\n${_.flatten(data.map(e => nodes[e.name](e))).join('\n')}\n${' '.repeat(currentTab - tab)}}`;
};

export default render;
