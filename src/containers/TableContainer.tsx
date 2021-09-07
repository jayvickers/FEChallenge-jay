
import React, { useEffect, useState } from 'react';
import DisplayTable from '../components/DisplayTable/DisplayTable';
import DeleteModal from '../components/DeleteModal/DeleteModal';
import { Content, DataTableSkeleton, Pagination } from 'carbon-components-react';
import { IPaginationChange, IFormattedDataTableRow, IFormattedProductRow, IHeaderRow, IRowState, TSplitRowData } from '../types/tableTypes';
import { getData, flattenSplitArray, splitDataIntoPageSize } from '../helpers/helpers';

const TableContainer: React.FC<any> = () => {
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [rowsToDelete, setRowsToDelete] = useState<IFormattedDataTableRow[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pageNum, setPageNum] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [rows, setRows] = useState<TSplitRowData>([]);
    const [totalSize, setTotalSize] = useState<number>(0);

    //delete row from storage
    const deleteRows = (deletedRows: IFormattedDataTableRow[]) => {
        //remove row from state
        let flattenedRows: IFormattedProductRow[] = flattenSplitArray(rows);
        flattenedRows = flattenedRows.filter((row) => {
            return !deletedRows.some(delRow => delRow.id === row.id)
        });

        //repopulate pagination data
        const splitRows: TSplitRowData = splitDataIntoPageSize(flattenedRows, pageSize);

        setRows(splitRows);
        let currPageIdx: number = pageNum;
        if (currPageIdx > splitRows.length) {
            currPageIdx = splitRows.length;
        }
        setPageNum(currPageIdx);
        setTotalSize(flattenedRows.length);
    }

    //update row with new vals
    const updateStorage = (rowId: string, newVals: IRowState[]) => {
        let updatedRows: TSplitRowData = [...rows];
        let rowIdx: number = rows[pageNum - 1].findIndex((row) => row.prod_id === rowId);
        let pageToUpdate: IFormattedProductRow[] = updatedRows[pageNum - 1];
        let rowToUpdate: IFormattedProductRow = pageToUpdate[rowIdx];

        rowToUpdate.category = newVals[0].value as string;
        rowToUpdate.is_supported = newVals[2].value as boolean;
        rowToUpdate.list = newVals[3].value as string;
        rowToUpdate.product = newVals[4].value as string;
        rowToUpdate.vendor = newVals[5].value as string;
        updatedRows[pageNum - 1][rowIdx] = rowToUpdate;

        setRows(updatedRows);
    }

    //switch to new page or update pagesize if needed
    const handlePageChange = (e: IPaginationChange) => {
        const newPageNum: number = e.page;
        const newPageSize: number = e.pageSize;

        //changing page size, need to regroup
        if (newPageSize !== pageSize) {
            setPageSize(newPageSize);
            let flattenedRows: IFormattedProductRow[] = flattenSplitArray(rows);
            const splitRows: TSplitRowData = splitDataIntoPageSize(flattenedRows, newPageSize);

            setRows(splitRows);
        }
        setPageNum(newPageNum);
    }

    //initial call to grab data from endpoint
    useEffect(() => {
        getData("https://patch-advisories-dev.mybluemix.net/api/v1/products?fmt=json")
            .then((result) => {
                let res: IFormattedProductRow[] = result.data;
                res.forEach((result: IFormattedProductRow) => {
                    //format data for better display
                    result.id = result.prod_id;
                    const createdDate = new Date(result.created_at);
                    result.created_at = createdDate.toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    });
                });
                const splitRows: TSplitRowData = splitDataIntoPageSize(res, pageSize);
                setRows(splitRows);
                setIsLoading(false);
                setTotalSize(result.data.length);
            })
            .catch((error: Error) => {
                console.error('Error getting data:', error);
            });
    }, []);

    /************************/
    /* MODAL EVENT HANDLERS */
    /************************/

    const handleCloseDeleteModal = (confirmDelete: boolean) => {
        if (confirmDelete) {
            deleteRows(rowsToDelete);
        }
        setDeleteModalOpen(false);
    }

    const handleOpenDeleteModal = (deletedRows: IFormattedDataTableRow[]) => {
        setRowsToDelete(deletedRows);
        setDeleteModalOpen(true);
    }

    const headers: IHeaderRow[] = [
        { "key": "category", "header": "Category" },
        { "key": "created_at", "header": "Created Date" },
        { "key": "is_supported", "header": "Supported" },
        { "key": "list", "header": "List" },
        { "key": "product", "header": "Product" },
        { "key": "vendor", "header": "Vendor" }
    ];

    return (
        <Content id="main-content">
            <DeleteModal isOpen={deleteModalOpen} numRows={rowsToDelete.length} handleCloseDeleteModal={handleCloseDeleteModal} />
            {isLoading ?
                <DataTableSkeleton headers={headers} rowCount={10} />
                :
                <>
                    <DisplayTable
                        deleteRows={handleOpenDeleteModal}
                        rows={rows[pageNum - 1] as IFormattedDataTableRow[]}
                        headers={headers}
                        updateStorage={updateStorage} />

                    <Pagination
                        backwardText="Previous page"
                        forwardText="Next page"
                        itemsPerPageText="Items per page:"
                        onChange={(e) => handlePageChange(e)}
                        page={pageNum}
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