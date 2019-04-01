import _ from 'lodash';

const tab = 4;

const currentTab = depth => tab * depth;

const stringify = (obj, depth) => {
  if (!(obj instanceof Object)) {
    return obj;
  }
  return Object.keys(obj)
    .reduce((acc, e, i) => [...acc, `{\n${' '
      .repeat(currentTab(depth) + tab)}${e}: ${Object.values(obj)[i]}\n${' '
      .repeat(currentTab(depth))}}`], [])
    .join('\n');
};

const nodes = {
  added: ({ key, value }, depth) => `${' '
    .repeat(currentTab(depth) - 2)}+ ${key}: ${stringify(value, depth)}`,
  deleted: ({ key, value }, depth) => `${' '
    .repeat(currentTab(depth) - 2)}- ${key}: ${stringify(value, depth)}`,
  changed: ({ key, valueAfter, valueBefore }, depth) => [
    `${' '.repeat(currentTab(depth) - 2)}- ${key}: ${stringify(valueBefore, depth)}`,
    `${' '.repeat(currentTab(depth) - 2)}+ ${key}: ${stringify(valueAfter, depth)}`,
  ],
  unchanged: ({ key, value }, depth) => `${' '
    .repeat(currentTab(depth))}${key}: ${stringify(value, depth)}`,
  complexData: ({ key, children }, depth, render) => `${' '
    .repeat(currentTab(depth))}${key}: ${render(children, depth + 1)}`,
};

const render = (data, depth = 1) => `{\n${_
  .flatten(data.map(e => nodes[e.name](e, depth, render)))
  .join('\n')}\n${' '.repeat(currentTab(depth) - tab)}}`;

export default render;
