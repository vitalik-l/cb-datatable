const generateMockData = ({columnsNumber = 4, columnName = 'column', rowsNumber = 100}) => {
  let columns = [];
  for (let i = 0; i < columnsNumber; i++) {
    let _columnName = typeof columnName === 'function' ? columnName(i) : columnName;
    columns.push({
      name: _columnName + i,
      label: _columnName + ' ' + i
    })
  }

  let data = [];
  for (let i = 0; i < rowsNumber; i++) {
    let row = {};
    columns.forEach(column => {
      row[column.name] = column.name + ' ' + i;
    });
    data.push(row);
  }
  return {columns, data};
};

export {
  generateMockData
};
