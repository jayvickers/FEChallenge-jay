export type TOrder = number[];

export interface IWssFeedUpdate {
    product_id: string;
    numLevels: number;
    feed: TDataFeed;
    bids: TOrderList;
    asks: TOrderList;
}

export interface IOrderUpdate {
    product_id: string;
    feed: string;
    bids: TOrderList;
    asks: number[][];
}

export interface IOrderState {
    asks: TOrderList;
    bids: TOrderList;
}

export interface IWSSSubscribeEvent {
    event: TSubscribeEventOptions;
    feed: string;
    product_ids: string[];
}

export type TGrouping = string[];

export type TOrderList = number[][];

export type TOrderType = "ask" | "bid";

export type TTickerType = "PI_XBTUSD" | "PI_ETHUSD";

export type TDataFeed = "book_ui_1" | "book_ui_1_snapshot";

export type TSubscribeEventOptions = "subscribe" | "unsubscribe";

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
    value: string | boolean;
    cells: [];
}

export interface IHeaderRow {
    key: string,
    header: string
}

export interface IPaginationChange {
    page: number;
    pageSize: number;
}

export type TSplitRowData = IFormattedProductRow[][];
export type TFormattedProductRow = IFormattedProductRow[][];