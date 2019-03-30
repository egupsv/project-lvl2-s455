export default data => {
  return data//.reduce((acc, e) => [...acc, e.key], []);
};