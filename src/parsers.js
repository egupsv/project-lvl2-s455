import yaml from 'js-yaml';
import ini from 'ini';

const iniParse = (data) => {
  if (typeof data === 'string' && Number(data)) {
    return Number(data);
  }
  if (data instanceof Array) {
    return data.map(e => iniParse(e));
  }
  if (typeof data === 'object') {
    return Object.keys(data)
      .reduce((acc, e, i) => ({ ...acc, [e]: iniParse(Object.values(data)[i]) }), {});
  }
  return data;
};

const formats = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: data => iniParse(ini.parse(data)),
};

export default (format, content) => formats[format](content);
