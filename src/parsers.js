import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import ini from 'ini';

const formats = {
  json: filePath => JSON.parse(fs.readFileSync(filePath)),
  yaml: filePath => yaml.safeLoad(fs.readFileSync(filePath)),
  ini: filePath => ini.parse(fs.readFileSync(filePath)),
};

export default filePath => formats[path.extname(filePath).slice(1)](filePath);
