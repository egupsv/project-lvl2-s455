import render from './renderer';
import plain from './plain_renderer';

const rendererFormat = {
  render,
  plain,
};

export default (ast, format = 'render') => rendererFormat[format](ast);
