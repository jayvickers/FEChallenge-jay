
import React, { useEffect, useState } from 'react';
import DisplayTable from '../components/DisplayTable/DisplayTable';
import { Content, DataTableSkeleton, Pagination } from 'carbon-components-react';
import { IPaginationChange, IFormattedDataTableRow, IFormattedProductRow, TSplitRowData } from '../types/tableTypes';
const TableContainer = () => {
    //TODO: type state here
    //TODO: type functions

    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [rows, setRows] = useState<TSplitRowData>([]);
    const [totalSize, setTotalSize] = useState(0);

    const splitDataIntoPageSize = (arr: IFormattedProductRow[], chunkSize: number) => {
        const res: TSplitRowData = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk: IFormattedProductRow[] = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    const handlePageChange = (e: IPaginationChange) => {
        const newPageNum: number = e.page;
        const newPageSize: number = e.pageSize;

        //changing page size, need to regroup
        if (newPageSize !== pageSize) {
            setPageSize(newPageSize);
            let flattenedRows: IFormattedProductRow[] = [];
            for (let i: number = 0; i < rows.length; i++) {
                flattenedRows = flattenedRows.concat(rows[i]);
            }
            setRows(splitDataIntoPageSize(flattenedRows, newPageSize));
        }

        setPage(newPageNum);
    }

    const getData = async () => {
        let response: Response = await fetch(
            "https://patch-advisories-dev.mybluemix.net/api/v1/products?fmt=json"
        );
        let jsonData: Promise<any> = await response.json();
        return jsonData;
    };

    useEffect(() => {
        getData()
            .then((result) => {
                //TODO: type out json result here
                let res: IFormattedProductRow[] = result.data;
                res.forEach((result: IFormattedProductRow) => result.id = result.prod_id);
                setRows(splitDataIntoPageSize(res, pageSize));
                setIsLoading(false);
                setTotalSize(result.data.length);
            })
            .catch((error: Error) => {
                console.error('Error:', error);
            });
    }, []);


    // let res: IProductRow[] = [{ "id": "0", "category": "Adobe", "catid": "26", "created_at": "2009-10-22T16:42:47.038Z", "is_supported": true, "list": "advisory-adobe@secintel.ibm.com", "prod_id": "85", "product": "ColdFusion", "vendor": "Adobe", "vendor_id": "43" }];

    const headers = [{ "key": "category", "header": "Category" }, { "key": "created_at", "header": "Created Date" }, { "key": "is_supported", "header": "Supported" }, { "key": "list", "header": "List" }, { "key": "product", "header": "Product" }, { "key": "vendor", "header": "Vendor" }];

    // const headers = [{ "key": "name", "header": "Name" }, { "key": "protocol", "header": "Protocol" }, { "key": "port", "header": "Port" }, { "key": "rule", "header": "Rule" }, { "key": "attached_groups", "header": "Attached Groups" }];
    // const headersSkele = [{ "key": "name2", "header": "a" }, { "key": "name", "header": "Name" }, { "key": "protocol", "header": "Protocol" }, { "key": "port", "header": "Port" }, { "key": "rule", "header": "Rule" }, { "key": "attached_groups", "header": "Attached Groups" }];

    return (
        <Content id="main-content">
            {isLoading ?
                <DataTableSkeleton headers={headers} rowCount={10} />
                :
                <>
                    <DisplayTable rows={rows[page - 1] as IFormattedDataTableRow[]} headers={headers} />
                    <Pagination
                        backwardText="Previous page"
                        forwardText="Next page"
                        itemsPerPageText="Items per page:"
                        onChange={(e) => handlePageChange(e)}
                        page={page}
                        pageNumberText="Page Number"
                        pageSize={pageSize}
                        pageSizes={[
                            10,
                            20,
                            30,
                            40,
                            50
                        ]}
                        totalItems={totalSize}
                    />
                </>
            }
        </Content>
    )
}


export default TableContainer;