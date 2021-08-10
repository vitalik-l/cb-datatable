export const get = (obj: any, path: string, defaultValue?: any) => {
  if (obj[path]) return obj[path];
  return String(path)
    .split('.')
    .reduce((acc, v) => {
      try {
        acc = acc[v] === undefined ? defaultValue : acc[v];
      } catch (e) {
        return defaultValue;
      }
      return acc;
    }, obj);
};
