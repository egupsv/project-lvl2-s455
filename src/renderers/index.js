import tree from './tree_renderer';
import plain from './plain_renderer';
import json from './json_renderer';

const rendererFormat = {
  tree,
  plain,
  json,
};

export default (ast, format) => rendererFormat[format](ast);
