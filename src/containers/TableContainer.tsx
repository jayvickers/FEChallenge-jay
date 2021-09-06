
import React, { useEffect, useState } from 'react';
import DisplayTable from '../components/DisplayTable/DisplayTable';
import DeleteModal from '../components/DeleteModal/DeleteModal';
import { Content, DataTableSkeleton, Pagination } from 'carbon-components-react';
import { IPaginationChange, IFormattedDataTableRow, IFormattedProductRow, IHeaderRow, TSplitRowData } from '../types/tableTypes';
import { getData, flattenSplitArray, splitDataIntoPageSize } from '../helpers/helpers';

const TableContainer: React.FC<any> = () => {
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [rowsToDelete, setRowsToDelete] = useState<IFormattedDataTableRow[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
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
        setRows(splitDataIntoPageSize(flattenedRows, pageSize));
        setTotalSize(flattenedRows.length);
    }

    //switch to new page or update pagesize if needed
    const handlePageChange = (e: IPaginationChange) => {
        const newPageNum: number = e.page;
        const newPageSize: number = e.pageSize;

        //changing page size, need to regroup
        if (newPageSize !== pageSize) {
            setPageSize(newPageSize);
            let flattenedRows: IFormattedProductRow[] = flattenSplitArray(rows);
            setRows(splitDataIntoPageSize(flattenedRows, newPageSize));
        }

        setPage(newPageNum);
    }

    useEffect(() => {
        getData("https://patch-advisories-dev.mybluemix.net/api/v1/products?fmt=json")
            .then((result) => {
                let res: IFormattedProductRow[] = result.data;
                res.forEach((result: IFormattedProductRow) => result.id = result.prod_id);
                setRows(splitDataIntoPageSize(res, pageSize));
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

    const headers: IHeaderRow[] = [{ "key": "category", "header": "Category" }, { "key": "created_at", "header": "Created Date" }, { "key": "is_supported", "header": "Supported" }, { "key": "list", "header": "List" }, { "key": "product", "header": "Product" }, { "key": "vendor", "header": "Vendor" }];

    return (
        <Content id="main-content">
            <DeleteModal isOpen={deleteModalOpen} numRows={rowsToDelete.length} handleCloseDeleteModal={handleCloseDeleteModal} />
            {isLoading ?
                <DataTableSkeleton headers={headers} rowCount={10} />
                :
                <>
                    <DisplayTable deleteRows={handleOpenDeleteModal} rows={rows[page - 1] as IFormattedDataTableRow[]} headers={headers} />
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