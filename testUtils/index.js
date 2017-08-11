const generateMockData = ({columnsNumber = 4, columnLabel = 'column', rowsNumber = 100, dataFunc = false}) => {
  let columns = [];
  for (let i = 0; i < columnsNumber; i++) {
    let _columnLabel = typeof columnLabel === 'function' ? columnLabel(i) : columnLabel + ' ' + i;
    columns.push({
      name: 'column' + i,
      label: _columnLabel
    })
  }

  let data = [];
  for (let i = 0; i < rowsNumber; i++) {
    let row = {};
    columns.forEach(column => {
      row[column.name] = dataFunc ? dataFunc(column, i) : column.name + ' ' + i;
    });
    data.push(row);
  }
  return {columns, data};
};

export {
  generateMockData
};
