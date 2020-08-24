const orderBy = (arr, orderBy) => {
  let keys = Object.keys(orderBy);
  if (!keys.length) return arr;
  return arr.sort((a,b) => {
    const ca = a[keys[0]] === 'string' ? a[keys[0]].toLowerCase() : a[keys[0]],
      cb = b[keys[0]] === 'string' ? b[keys[0]].toLowerCase() : b[keys[0]],
      desc = orderBy[keys[0]] === 'desc';
    if (ca > cb) {
      return desc ? -1 : 1;
    }
    if (ca < cb) {
      return desc ? 1 : -1;
    }
  });
};

const sortData = (data: any, orderType: any) => {
  const orderedData = orderBy(data, orderType);
  return orderedData.slice();
};

const getDataPerPage = (data: any, page: number, rowsPerPage: number) => {
  let indexStart = (+page - 1) * rowsPerPage;
  return data.slice(indexStart, indexStart + rowsPerPage);
};

export {
  orderBy,
  sortData,
  getDataPerPage
};
