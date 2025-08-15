import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
  Card,
  Box,
  styled,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

type DataTableProps<T extends object> = {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  renderSubComponent?: (row: T) => React.ReactNode;
};

const BodyTableRow = styled(TableRow)(() => ({
  '&:last-of-type': {
    '& td': {
      borderBottom: 'none',
    },
  },
}));

const DataTable = <T extends object>({
  columns,
  data,
  renderSubComponent,
}: DataTableProps<T>) => {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => !!renderSubComponent,
  });

  return (
    <TableContainer component={Card}>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <BodyTableRow>
                {row.getVisibleCells().map((cell, idx) => (
                  <TableCell key={cell.id}>
                    <Stack flexDirection="row" gap={1}>
                      {idx === 0 && renderSubComponent && (
                        <Box>
                          <IconButton onClick={row.getToggleExpandedHandler()}>
                            {row.getIsExpanded() ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </IconButton>
                        </Box>
                      )}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Stack>
                  </TableCell>
                ))}
              </BodyTableRow>

              {row.getIsExpanded() && renderSubComponent && (
                <TableRow>
                  <TableCell colSpan={row.getVisibleCells().length}>
                    {renderSubComponent(row.original)}
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
