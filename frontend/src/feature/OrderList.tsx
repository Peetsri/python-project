import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, colors, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/system/Box';
import SimpleBottomNavigation from '../component/Footer';

interface Column {
  id: 'code' | 'cus_name' | 'status' | 'start_date' | 'pickup_date' | 'amount' | 'price' | 'delivery';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'code', label: 'รหัสคำสั่งจัดทำ', minWidth: 170 },
  { id: 'cus_name', label: 'ชื่อลูกค้า', minWidth: 100 },
  { id: 'status', label: 'สถานะ', minWidth: 170 },
  { id: 'start_date', label: 'วันที่เริ่มทำป้าย', minWidth: 170 },
  { id: 'pickup_date', label: 'วันที่ได้รับป้าย', minWidth: 170 },
  {
    id: 'amount',
    label: 'จำนวน',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'ราคา',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'delivery',
    label: 'วิธีการรับป้าย',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  code: string;
  cus_name: string;
  status: string;
  start_date:string;
  pickup_date:string;
  amount: number;
  price: number;
  delivery: string;
}

function createData(
  code: string,
  cus_name: string,
  status: string,
  start_date:string,
  pickup_date:string,
  amount: number,
  price: number,
  delivery: string,
): Data {
    return { code,cus_name,status,start_date,pickup_date,amount,price,delivery};
  }


const rows = [
  createData('India', 'IN','status','2016-05-02T00:00:00','2016-05-02T00:00:00', 3287263,555,'test'),
  createData('India', 'IN','status','2016-05-02T00:00:00','2016-05-02T00:00:00', 3287263,555,'test'),
  createData('India', 'IN','status','2016-05-02T00:00:00','2016-05-02T00:00:00', 3287263,555,'test'),
  createData('India', 'IN','status','2016-05-02T00:00:00','2016-05-02T00:00:00', 3287263,555,'test'),

];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ width: '98%', m: 1, display:"flex", justifyContent:"flex-end",alignItems:"flex-end"}}>
        <Button variant="contained" sx={{bgcolor:'#5E35B1'}}>
        + เพิ่มคำสั่งใหม่
        </Button>
        </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.cus_name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Box sx={{m:-3}}>
        <SimpleBottomNavigation/>
      </Box>
    </Paper>
        
  );
}