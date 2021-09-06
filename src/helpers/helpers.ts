import { IFormattedProductRow, TSplitRowData } from '../types/tableTypes';

//get data from api endpoint
const getData = async (url: string) => {
    let response = await fetch(url);
    let jsonData = await response.json();
    return jsonData;
};

//flatten chunked array, makes it easier to manipulate
const flattenSplitArray = (arr: TSplitRowData) => {
    let flattenedRows: IFormattedProductRow[] = [];
    for (let i: number = 0; i < arr.length; i++) {
        flattenedRows = flattenedRows.concat(arr[i]);
    }

    return flattenedRows;
}

//chunk array into sizes of paginated data
const splitDataIntoPageSize = (arr: IFormattedProductRow[], chunkSize: number) => {
    const splitArr: TSplitRowData = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk: IFormattedProductRow[] = arr.slice(i, i + chunkSize);
        splitArr.push(chunk);
    }
    return splitArr;
}

export { getData, flattenSplitArray, splitDataIntoPageSize }