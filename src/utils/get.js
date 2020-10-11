export const get = (value, path, defaultValue) => {
  return String(path).split('.').reduce((acc, v) => {
    try {
      acc = acc[v] === undefined ? defaultValue : acc[v];
    } catch (e) {
      return defaultValue;
    }
    return acc;
  }, value);
};
