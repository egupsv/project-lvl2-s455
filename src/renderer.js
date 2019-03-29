export default data => {
  const result = string => { 
    switch (string.name) {
      case 'plus':
        return `  + ${string.key}: ${string.value}`;
      case 'minus':
        return `  - ${string.key}: ${string.value}`;
      case 'nothing':
        return `    ${string.key}: ${string.value}`;
      case 'both':
        return `    ${string.key}: ${string.value}`;
    }
  }  
  
  return ;
};