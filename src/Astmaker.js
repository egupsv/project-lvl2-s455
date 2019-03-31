import _ from 'lodash';

const propertyActions = [
  {
    check: (key, before) => !_.has(before, key),
    node: (key, before, after) => ({ key, value: after[key], name: 'added' }),
  },
  {
    check: (key, before, after) => !_.has(after, key),
    node: (key, before) => ({ key, value: before[key], name: 'deleted' }),
  },
  {
    check: (key, before, after) => before[key] instanceof Object && after[key] instanceof Object,
    node: (key, before, after, f) => ({ key, children: f(before[key], after[key]), name: 'complexData' }),
  },
  {
    check: (key, before, after) => before[key] === after[key],
    node: (key, before) => ({ key, value: before[key], name: 'unchanged' }),
  },
  {
    check: (key, before, after) => before[key] !== after[key],
    node: (key, before, after) => ({
      key,
      valueBefore: before[key],
      valueAfter: after[key],
      name: 'added_deleted',
    }),
  },
];

const getPropertyAction = (...arg) => _.find(propertyActions, ({ check }) => check(...arg));

const makeAST = (before, after) => {
  const union = _.union(Object.keys(before), Object.keys(after))
    .map((e) => {
      const { node } = getPropertyAction(e, before, after);
      return node(e, before, after, makeAST);
    });
  return union;
};

export default makeAST;
