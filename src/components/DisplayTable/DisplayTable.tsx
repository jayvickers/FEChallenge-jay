import React from 'react';
import { useEffect, useState } from 'react';
import { IFormattedDataTableRow } from '../../types/tableTypes';
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
} from 'carbon-components-react';

//TODO: type out the header
//TODO: create expanded row component


interface IDisplayTableProps {
  headers: any,
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
            <TableBatchActions {...getBatchActionProps()}>
              <TableBatchAction
                tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                // renderIcon={<Button kind="danger">delete</Button>}
                //TODO: figure out delete icon
                //TODO: delete functionality
                onClick={() => { }}>
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
                {headers.map((header: any, i: number) => (
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
                      <TableCell key={cell.id}>{cell.value}</TableCell>
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
