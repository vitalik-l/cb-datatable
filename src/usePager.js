import React from 'react';
import {getDataPerPage} from './utils/index';

function usePager(data, rowsPerPage) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const dataPerPage =  React.useMemo(() => rowsPerPage ? getDataPerPage(data, currentPage, rowsPerPage) : data, [currentPage, rowsPerPage, data]);
  return {dataPerPage, currentPage, setCurrentPage};
}

export default usePager;
