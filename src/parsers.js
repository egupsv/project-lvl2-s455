import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

const formats = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (filePath, content) => formats[path.extname(filePath).slice(1)](content);
