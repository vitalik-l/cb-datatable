import React from 'react';

// local files
import { getDataPerPage } from './utils';

const useDataPerPage = ({ rowsPerPage, page, data }) => {
  return React.useMemo(
    () => (rowsPerPage && data ? getDataPerPage(data, page, rowsPerPage) : data),
    [page, rowsPerPage, data],
  );
}

export default useDataPerPage;
