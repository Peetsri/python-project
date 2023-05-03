import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, colors, Link, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/system/Box';
import SimpleBottomNavigation from '../../components/Footer';
import HeaderToolbar from '@/components/HeaderToolbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';



interface Column {
    id: 'id' | 'name' | 'amount' | 'booking'|'priceperitem' ;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'รหัสอุปกรณ์', minWidth: 170 },
    { id: 'name', label: 'ชื่ออุปกรณ์', minWidth: 100 },
    { id: 'amount', label: 'จำนวนทั้งหมด', minWidth: 170 },
    { id: 'booking', label: 'จำนวนจองใช้งาน', minWidth: 170 },
    { id: 'priceperitem', label: 'ราคาต่อชิ้น', minWidth: 170 },
];


export default function StickyHeadTable() {
  type ResponseData = number[][];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
};

  const handleOnClick = () =>
  {
    window.location.href = '/item-list/add'
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };
  const [rows, setRows] = useState([]);

  useEffect(() => {
      fetch('http://127.0.0.1:8000/item')
          .then(response => response.json())
          .then(data => setRows(data))
          .catch(error => console.log(error));
  }, []);

  const router = useRouter();

  const handleOnClickRow = (row:any) =>
  {
      router.push(`/item-list/edit/${row.id}`);
  }
  

  return (



    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <HeaderToolbar></HeaderToolbar>
      <Box sx={{ width: '98%', m: 1, display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
     
        <Button variant="contained" sx={{ bgcolor: '#5E35B1' }} onClick={handleOnClick}>
          + เพิ่มอุปกรณ์
        </Button>
      
      </Box>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  //align={column.align}
                  align="center"
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row}
                  onClick={()=>handleOnClickRow(row)} >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="center">
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
      <Box sx={{ m: -3 }}>
        <SimpleBottomNavigation />
      </Box>
    </Paper>

  );
}

