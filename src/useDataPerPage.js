import React from 'react';

// local files
import { getDataPerPage } from './utils';

export const useDataPerPage = ({ rowsPerPage, page, data }) => {
  return React.useMemo(
    () => (rowsPerPage && data ? getDataPerPage(data, page, rowsPerPage) : data),
    [page, rowsPerPage, data],
  );
}
