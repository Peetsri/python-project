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
//import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router';



interface Column {
    id: 'id' | 'cus_id' | 'status_id' | 'date_start' | 'date_pickup' |'product_id'| 'amount' | 'totalprice' | 'delivery_id';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'รหัสคำสั่งจัดทำ', minWidth: 170 },
    { id: 'cus_id', label: 'ชื่อลูกค้า', minWidth: 100 },
    { id: 'status_id', label: 'สถานะ', minWidth: 170 },
    { id: 'date_start', label: 'วันที่เริ่มทำป้าย', minWidth: 170 },
    { id: 'date_pickup', label: 'วันที่ได้รับป้าย', minWidth: 170 },
    { id: 'product_id', label: 'ชื่อสินค้า', minWidth: 170 },
    {
        id: 'amount',
        label: 'จำนวน',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'totalprice',
        label: 'ราคา',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'delivery_id',
        label: 'วิธีการรับป้าย',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
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
    window.location.href = '/order-list/add'
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };
  const [rows, setRows] = useState([]);

  useEffect(() => {
      fetch('http://127.0.0.1:8000/orderlist')
          .then(response => response.json())
          .then(data => setRows(data))
          .catch(error => console.log(error));
  }, []);


  // const UsersPage: React.FC = () => {
  //   const router = useRouter();
  
  // const handleRowClick = (row: any) => {
  //     router.push(`/order-list/edit/${row.id}`);
  // };
  

const [selectedRow, setSelectedRow] = React.useState<Record<string, unknown>>({});

console.log('row:', { selectedRow});
const rowId = selectedRow.id ;
console.log(rowId)

const router = useRouter();

const handleOnClickRow = (row:any) =>
{
    router.push(`/order-list/edit/${row.id}/${row.status_id}`);
    //router.push(`/order-list/edit/${row.status_id}`);
}

//window.location.href = '/order-list/edit'


//<Link>http://127.0.0.1:8000/delete_user/${rowId}</Link>
//window.location.href = 'http://127.0.0.1:8000/delete_user/${rowId}'



  return (


    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <HeaderToolbar></HeaderToolbar>
      <Box sx={{ width: '98%', m: 1, display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
     
        <Button variant="contained" sx={{ bgcolor: '#5E35B1' }} onClick={handleOnClick}>
          + เพิ่มคำสั่งใหม่
        </Button>
      
      </Box>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
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
                  onClick={()=>handleOnClickRow(row)}>  
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="center">
                          {column.id == 'status_id'?value==1?"คำสั่งทำป้ายใหม่":value==2?"ยืนยันการชำระเงิน":value==3?"Confirm แบบทำป้ายไฟ":value==4?"กำลังจัดทำ":value==5?"จัดทำแล้วเสร็จ":value==6?"จัดส่งแล้วเสร็จ":value==7?"ยกเลิก":"":column.id == 'delivery_id'?value==1?"ส่งธรรมดา":value==2?"ส่งด่วนพิเศษ(EMS)":value==3?"รับด้วยตัวเอง":"":column.format && typeof value === 'number'
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

