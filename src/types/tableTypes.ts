export interface IFormattedProductRow {
    category: string;
    catid: string;
    created_at: string;
    id: string | null,
    is_supported: boolean,
    list: string;
    prod_id: string;
    product: string;
    vendor: string;
    vendor_id: string;
}

export interface IFormattedDataTableRow extends IFormattedProductRow {
    id: string;
    disabled?: boolean | undefined;
    isExpanded?: boolean | undefined;
    isSelected?: boolean | undefined;
    cells: []
}

export interface IHeaderRow {
    key: string,
    header: string
}

export interface IPaginationChange {
    page: number;
    pageSize: number;
}

export interface TCellHeaderInfo {
    header: string;
}

export interface TCell {
    errors: any;
    id: string;
    info: TCellHeaderInfo;
    isEditable: boolean;
    isEditing: boolean;
    isValid: boolean;
    value: TValueType;
}

export interface IRowState {
    value: TValueType;
    modified: boolean;
}

export type TValueType = string | boolean;

export type TSplitRowData = IFormattedProductRow[][];
export type TFormattedProductRow = IFormattedProductRow[][];