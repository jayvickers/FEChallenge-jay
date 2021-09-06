import React from 'react';
import { IFormattedDataTableRow, IHeaderRow } from '../../types/tableTypes';
import {
  Button,
  DataTable,
  Table,
  TableContainer,
  TableBatchActions,
  TableBatchAction,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableHead,
  TableRow,
  TableHeader,
  TableToolbarAction,
  TableBody,
  TableSelectAll,
  TableSelectRow,
  TableToolbarMenu,
  TableExpandedRow,
  TableExpandHeader,
  TableExpandRow,
  TableCell,
  ToastNotification
} from 'carbon-components-react';

import { CheckmarkFilled16, TrashCan32 } from '@carbon/icons-react';
interface IDisplayTableProps {
  deleteRows: (deletedRows: IFormattedDataTableRow[]) => void;
  headers: IHeaderRow[],
  rows: IFormattedDataTableRow[]
}

const DisplayTable: React.FC<IDisplayTableProps> = (props: IDisplayTableProps) => {
  //TODO: type out datatable props here or see if we even need them
  return (
    <DataTable rows={props.rows} headers={props.headers} isSortable>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getSelectionProps,
        getToolbarProps,
        getBatchActionProps,
        onInputChange,
        selectedRows,
        getTableProps,
        getTableContainerProps,
      }: any) => (
        <TableContainer
          title="DataTable"
          description="With batch actions"
          {...getTableContainerProps()}>
          <TableToolbar {...getToolbarProps()}>
            <TableBatchActions {...getBatchActionProps()} shouldShowBatchActions={selectedRows.length > 0}>
              <TableBatchAction
                tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                renderIcon={TrashCan32}
                iconDescription="Delete Icon"
                onClick={() => props.deleteRows(selectedRows)}>
                Delete
              </TableBatchAction>
            </TableBatchActions>


            {/* //TODO: write custom search 
            <TableToolbarContent>
              <TableToolbarSearch
                persistent
                tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                onChange={onInputChange}
              />

            </TableToolbarContent> */}
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableExpandHeader />
                <TableSelectAll {...getSelectionProps()} />
                {headers.map((header: IHeaderRow, i: number) => (
                  <TableHeader key={i} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: IFormattedDataTableRow, i: number) => (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map((cell: IFormattedDataTableRow) => (
                      /* TODO: use a date obect for created date */
                      /* TODO: add someting for is_supported */
                      <TableCell key={cell.id}>
                        {
                          cell.value === true ? <CheckmarkFilled16 className="table-cell__supported" /> : cell.value
                        }

                        {/* {cell.value} */}

                      </TableCell>
                    ))}
                  </TableExpandRow>
                  <TableExpandedRow
                    colSpan={headers.length + 2}
                    className="demo-expanded-td">
                    {row.cells.map((cell: IFormattedDataTableRow, index: number) => (
                      //TODO: update functionality
                      <input key={row.id + index} type="text" />
                    ))}
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

export default DisplayTable;
