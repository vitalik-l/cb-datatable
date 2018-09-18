function generateMockData({columnsNumber = 4, columnLabel = 'column', rowsNumber = 100, dataFunc = false}) {
  let columns = [];
  for (let i = 0; i < columnsNumber; i++) {
    let columnName =  'column' + i,
        _columnLabel = typeof columnLabel === 'function' ? columnLabel(i) : columnLabel + ' ' + i;
    columns.push({
      name: columnName,
      label: _columnLabel,
      className: columnName
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
}

function generateDataForColumns(columns, rowsNumber, dataFunc = false) {
  let data = [];
  for (let i = 0; i < rowsNumber; i++) {
    let row = {};
    columns.forEach(column => {
      row[column.name] = dataFunc ? dataFunc(column, i) : column.name + ' ' + i;
    });
    data.push(row);
  }
  return data;
}

export {
  generateMockData,
  generateDataForColumns
};
