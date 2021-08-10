import React from 'react';

// local files
import { getDataPerPage } from '../utils/getDataPerPage';

export const useDataPerPage = ({
  rowsPerPage,
  page,
  data,
}: {
  rowsPerPage: number;
  page: number;
  data: Array<any>;
}) => {
  return React.useMemo(
    () => (rowsPerPage && data ? getDataPerPage(data, page, rowsPerPage) : data),
    [page, rowsPerPage, data],
  );
};
