import { flattenSplitArray, splitDataIntoPageSize } from '../helpers/helpers';
import { IPaginationChange, IFormattedDataTableRow, IFormattedProductRow, IHeaderRow, TSplitRowData } from '../types/tableTypes';

const testRowItem: IFormattedProductRow = {
    category: "test",
    catid: "test2",
    created_at: "test3",
    id: "test4",
    is_supported: true,
    list: "list",
    prod_id: "1",
    product: "my prod",
    vendor: "vendor",
    vendor_id: "venid"
}

test('splitting array into correct chunks', () => {
    const testArr: IFormattedProductRow[] = [testRowItem, testRowItem, testRowItem];
    const splitArr = splitDataIntoPageSize(testArr, 2);
    const firstChunk = splitArr[0].length;
    expect(firstChunk).toBe(2);
});

test('correctly flatten split array', () => {
    const testArr: IFormattedProductRow[] = [testRowItem, testRowItem, testRowItem];
    const splitArr = splitDataIntoPageSize(testArr, 2);
    const flattenedArray = flattenSplitArray(splitArr);
    expect(flattenedArray.length).toBe(3);
});


export { }