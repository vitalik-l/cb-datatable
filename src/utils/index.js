export const getDataPerPage = (data: any, page: number, rowsPerPage: number) => {
  let indexStart = (+page - 1) * rowsPerPage;
  return data.slice(indexStart, indexStart + rowsPerPage);
};
