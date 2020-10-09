export const get = (value, path, defaultValue) => {
  return String(path).split('.').reduce((acc, v) => {
    try {
      acc = acc[v] || defaultValue
    } catch (e) {
      return defaultValue
    }
    return acc
  }, value)
};
