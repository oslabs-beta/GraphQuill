/**
 * @author : Austin Ruby
 * @function : debouncing function for use with VS Code document save listener
 * @changelog : ## add changes here
 * * */

function debounce(func: Function, wait: number, immediate: boolean) {
  // label for setTimeout
  let timeout: ReturnType<typeof setTimeout>|null;
  // return function that binds passed in func to passed in args and
  // calls w/setTimeout using wait milliseconds
  return function (...args: any[]) {
    // const context = this;
    // function to reset timeout label to null and invoke func with current
    // and args if immediate is false
    const later = function () {
      timeout = null;
      if (!immediate) func(...args);
    };
    // toggle checking if immediate is truthy and timeout is falsy
    const callNow = immediate && !timeout;
    // if timeout is truthy, clear it
    if (timeout) clearTimeout(timeout);
    // call setTimeout and label it as timeout
    timeout = setTimeout(later, wait);
    // if callNow is truthy invoke func with current context and args
    if (callNow) func(...args);
  };
}

module.exports = debounce;
