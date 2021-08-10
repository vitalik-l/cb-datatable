import React from 'react';

// local files
import { ColumnPropsContext } from '../ColumnPropsContext';

export const useColumnProps = () => React.useContext(ColumnPropsContext);
