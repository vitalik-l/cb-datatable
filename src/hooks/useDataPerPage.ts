import React from 'react';
import { getDataPerPage } from '../utils/getDataPerPage';

export const useDataPerPage = <T extends any[]>({
  rowsPerPage,
  page,
  data,
}: {
  rowsPerPage: number;
  page: number;
  data?: T;
}) => {
  return React.useMemo(
    () => (rowsPerPage && data ? getDataPerPage(data, page, rowsPerPage) : data),
    [page, rowsPerPage, data],
  );
};
