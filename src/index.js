module.exports = function check(str, bracketsConfig) {
  let brackets_stack = [];

  let config = {};

  for (let brackets of bracketsConfig) {
    if (brackets[0] !== brackets[1]) {
      config[brackets[0]] = {
        isOpen: true,
        isClose: false,
        closingBracket: brackets[1],
        openingBracket: null
      }

      config[brackets[1]] = {
        isOpen: false,
        isClose: true,
        closingBracket: null,
        openingBracket: brackets[0]
      }
    } else {
      config[brackets[0]] = {
        isOpen: true,
        isClose: true,
        closingBracket: brackets[0],
        openingBracket: brackets[0]
      }  
    }
  }

  for (let bracket of str) {
    if (config[bracket].isOpen && config[bracket].isClose) {
      if (brackets_stack[brackets_stack.length - 1] === bracket) {
        brackets_stack.pop();
      } else {
        brackets_stack.push(bracket);
      }
    } else if (config[bracket].isOpen) {
      brackets_stack.push(bracket);
    } else if (config[bracket].isClose) {
      if (brackets_stack.length === 0) return false;
      if (config[brackets_stack.pop()].closingBracket != bracket) return false;
    }
  } 

  return brackets_stack.length === 0;
}
