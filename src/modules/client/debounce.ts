function debounce(func: Function, wait: number, immediate: boolean) {
  let timeout: ReturnType<typeof setTimeout>|null;
  return function (this: any, ...args: any[]) {
    const context = this;
    // const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, ...args);
    };
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

module.exports = debounce;
