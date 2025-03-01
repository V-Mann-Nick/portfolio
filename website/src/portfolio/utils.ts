export const throttle = (
  func: () => void,
  wait: number,
) => {
  let lastCall = 0;
  let timeoutId: number | undefined = undefined;
  const newFunc = () => {
    clearTimeout(timeoutId);
    const now = Date.now();
    if (now - lastCall < wait) {
      timeoutId = setTimeout(newFunc, wait);
      return;
    }
    lastCall = now;
    func();
  };
  return newFunc;
};
