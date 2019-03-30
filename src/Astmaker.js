import _ from 'lodash';

const propertyActions = [
    {
      name: 'added',
      check: (key, before, after) => !_.has(before, key),
      result: (key, before, after) => ({ key, value: after[key] }),
    },
    {
      name: 'deleted',
      check: (key, before, after) => !_.has(after, key),
      result: (key, before, after) => ({ key, value: before[key] }),
    },
    {
      name: 'complexData',
      check: (key, before, after) => before[key] instanceof Object && after[key] instanceof Object,
      result: (key, before, after, f) => ({ key, children: f(before, after) }),
    },
    {
      name: 'unchanged',
      check: (key, before, after) => before[key] === after[key],
      result: (key, before, after) => ({ key, value: before[key] }),
    },
    {
      name: 'added_deleted',
      check: (key, before, after) => before[key] !== after[key],
      result: (key, before, after) => ({ key, valueBefore: before[key], valueAfter: after[key] })
    },
  ];

const getPropertyAction = (...arg) => _.find(propertyActions, ({ check }) => check(...arg));

const makeAST = (before, after) => {
  const arrUnion = _.union(Object.keys(before), Object.keys(after))
    .map(e => {
      const { name, result } = getPropertyAction(e, before, after);
      return {[name]: result(e, before, after, makeAST)}; 
    });
  console.log (arrUnion);
  return arrUnion;  
};

export default makeAST
