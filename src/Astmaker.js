import _ from 'lodash';

const propertyActions = [
    {
      name: 'plus',
      check: (key, before, after) => !_.has(before, key),
      value: (key, before, after) => after[key],
    },
    {
      name: 'minus',
      check: (key, before, after) => !_.has(after, key),
      value: (key, before, after) => before[key],
    },
    {
      name: 'complexData',
      check: (key, before, after) => before[key] instanceof Object && after[key] instanceof Object,
      children: (before, after, f) => f(before, after),
    },
    {
      name: 'nothing',
      check: (key, before, after) => before[key] === after[key],
      value: (key, before, after) => before[key],
    },
    {
      name: 'both',
      check: (key, before, after) => before[key] !== after[key],
      valueBefore: (key, before, after) => before[key],
      valueAfter: (key, before, after) => after[key],
    },
  ];

const getPropertyAction = (...arg) => _.find(propertyActions, ({ check }) => check(...arg));

export default (before, after) => {
  const arrUnion = _.union(Object.keys(before), Object.keys(after))
    .map(e => {
      const { name, key, ...rest } = getPropertyAction(e, before, after);
      return { name, key, ...rest };
    })
};
