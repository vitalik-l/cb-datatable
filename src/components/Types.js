// @flow

export type ColumnT = {
    name: string,
    label: string,
    sortable: boolean,
    renderer: any
};

export type ColumnsT = Array<ColumnT>;

export type DataT = Array<any>;