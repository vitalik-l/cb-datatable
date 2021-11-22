export const getDataPerPage = <T extends any[]>(data: T, page: number, rowsPerPage: number) => {
  if (!Array.isArray(data)) return [];
  let indexStart = (+page - 1) * rowsPerPage;
  return data.slice(indexStart, indexStart + rowsPerPage) as T;
};
