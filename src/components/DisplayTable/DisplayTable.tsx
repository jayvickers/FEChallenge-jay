import React, { useEffect, useState } from 'react';
import { IFormattedDataTableRow, IHeaderRow, IRowState, TCell, TSplitRowData, IFormattedProductRow } from '../../types/tableTypes';
import UpdateRow from '../UpdateRow/UpdateRow';
import {
  DataTable,
  Table,
  TableContainer,
  TableBatchActions,
  TableBatchAction,
  TableToolbar,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableSelectAll,
  TableSelectRow,
  TableExpandedRow,
  TableExpandHeader,
  TableExpandRow,
  TableCell
} from 'carbon-components-react';

import { CheckmarkFilled16, TrashCan32 } from '@carbon/icons-react';
interface IDisplayTableProps {
  deleteRows: (deletedRows: IFormattedDataTableRow[]) => void;
  headers: IHeaderRow[],
  rows: IFormattedDataTableRow[],
  updateStorage: (rowId: string, newVals: IRowState[]) => void;
}

const DisplayTable: React.FC<IDisplayTableProps> = (props: IDisplayTableProps) => {
  const [disRows, setdisRows] = useState<IFormattedDataTableRow[]>(props.rows);

  const updateRow = (rowId: string, newVals: IRowState[]) => {
    let updatedRows: IFormattedDataTableRow[] = [];

    disRows.forEach((row: IFormattedDataTableRow) => {
      updatedRows.push({ ...row });
    })

    let rowIdx: number = updatedRows.findIndex((row: IFormattedDataTableRow) => row.prod_id === rowId);

    const testRowItem: IFormattedDataTableRow = {
      id: updatedRows[rowIdx].id,
      category: newVals[0].value as string,
      catid: updatedRows[rowIdx].catid,
      cells: [],
      created_at: updatedRows[rowIdx].created_at,
      is_supported: newVals[2].value as boolean,
      list: newVals[3].value as string,
      product: newVals[4].value as string,
      prod_id: updatedRows[rowIdx].prod_id,
      vendor: newVals[5].value as string,
      vendor_id: updatedRows[rowIdx].vendor_id
    }
    updatedRows[rowIdx] = testRowItem;

    setdisRows(updatedRows);
  }

  useEffect(() => {
    setdisRows(props.rows);
  }, [props.rows])

  const handleUpdate = (rowId: string, newVals: IRowState[]) => {
    updateRow(rowId, newVals);
    props.updateStorage(rowId, newVals)
  }

  return (
    <DataTable rows={disRows} headers={props.headers} isSortable>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getSelectionProps,
        getBatchActionProps,
        selectedRows
      }: any) => (
        <TableContainer
          className="data-table"
          title="JSON Data Table"
          description="Paginated data table with delete and update functionality">
          <TableToolbar className="data-table__toolbar">
            <TableBatchActions className="toolbar__batch-actions" {...getBatchActionProps()} shouldShowBatchActions={selectedRows.length > 0}>
              <TableBatchAction
                tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                renderIcon={TrashCan32}
                iconDescription="Delete Icon"
                onClick={() => props.deleteRows(selectedRows)}>
                Delete
              </TableBatchAction>
            </TableBatchActions>
          </TableToolbar>
          <Table className="data-table__table">
            <TableHead className="table__header">
              <TableRow className="header__header-row">
                <TableExpandHeader />
                <TableSelectAll {...getSelectionProps()} />
                {headers.map((header: IHeaderRow, i: number) => (
                  <TableHeader key={i} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="table__table-body">
              {rows.map((row: IFormattedDataTableRow) => (
                <React.Fragment key={row.id + row.category}>
                  <TableExpandRow className="table-body__expand-row" {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map((cell: TCell) => (
                      <TableCell className="table-row__table-cell" key={cell.id + cell.value}>
                        {
                          cell.value === true ? <CheckmarkFilled16 className="table-cell__supported" /> : cell.value
                        }
                      </TableCell>
                    ))}
                  </TableExpandRow>
                  <TableExpandedRow
                    colSpan={headers.length + 2}
                    className="table-body__update-row">
                    <UpdateRow row={row} updateRow={handleUpdate} />
                  </TableExpandedRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};

export default DisplayTable