import React from 'react';
import { useEffect, useState } from 'react';
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

const DisplayTable = (): JSX.Element => {
  const rows = [{ "id": "a", "name": "Load Balancer 3", "protocol": "HTTP", "port": 3000, "rule": "Round robin", "attached_groups": "Kevin’s VM Groups" }, { "id": "b", "name": "Load Balancer 1", "protocol": "HTTP", "port": 443, "rule": "Round robin", "attached_groups": "Maureen’s VM Groups" }, { "id": "c", "name": "Load Balancer 2", "protocol": "HTTP", "port": 80, "rule": "DNS delegation", "attached_groups": "Andrew’s VM Groups" }, { "id": "d", "name": "Load Balancer 6", "protocol": "HTTP", "port": 3000, "rule": "Round robin", "attached_groups": "Marc’s VM Groups" }, { "id": "e", "name": "Load Balancer 4", "protocol": "HTTP", "port": 443, "rule": "Round robin", "attached_groups": "Mel’s VM Groups" }, { "id": "f", "name": "Load Balancer 5", "protocol": "HTTP", "port": 80, "rule": "DNS delegation", "attached_groups": "Ronja’s VM Groups" }];
  const headers = [{ "key": "name", "header": "Name" }, { "key": "protocol", "header": "Protocol" }, { "key": "port", "header": "Port" }, { "key": "rule", "header": "Rule" }, { "key": "attached_groups", "header": "Attached Groups" }];

  return (
    <DataTable rows={rows} headers={headers}>
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
                onClick={() => { }}>
                Delete
              </TableBatchAction>
            </TableBatchActions>
            <TableToolbarContent>
              <TableToolbarSearch
                persistent
                tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                onChange={onInputChange}
              />

            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableExpandHeader />

                <TableSelectAll {...getSelectionProps()} />

                {headers.map((header: any, i: any) => (
                  <TableHeader key={i} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>



              {rows.map((row: any, i: any) => (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map((cell: any) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableExpandRow>
                  <TableExpandedRow
                    colSpan={headers.length + 2}
                    className="demo-expanded-td">
                    {row.cells.map((cell: any) => (
                      <input type="text" />
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
