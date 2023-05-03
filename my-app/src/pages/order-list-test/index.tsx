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
import SimpleBottomNavigation from '../../components/Footer';
import HeaderToolbar from '@/components/HeaderToolbar';
import { useEffect, useState } from 'react';
import axios from 'axios';


// interface Column {
//     id: 'id' | 'cus_id' | 'status_id' | 'date_start' | 'date_pickup' | 'amount' | 'totalprice' | 'delivery_id';
//     label: string;
//     minWidth?: number;
//     align?: 'right';
//     format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//     { id: 'id', label: 'รหัสคำสั่งจัดทำ', minWidth: 170 },
//     { id: 'cus_id', label: 'ชื่อลูกค้า', minWidth: 100 },
//     { id: 'status_id', label: 'สถานะ', minWidth: 170 },
//     { id: 'date_start', label: 'วันที่เริ่มทำป้าย', minWidth: 170 },
//     { id: 'date_pickup', label: 'วันที่ได้รับป้าย', minWidth: 170 },
//     {
//         id: 'amount',
//         label: 'จำนวน',
//         minWidth: 170,
//         align: 'right',
//         format: (value: number) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'totalprice',
//         label: 'ราคา',
//         minWidth: 170,
//         align: 'right',
//         format: (value: number) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'delivery_id',
//         label: 'วิธีการรับป้าย',
//         minWidth: 170,
//         align: 'right',
//         format: (value: number) => value.toFixed(2),
//     },
// ];

// interface Data {
//     id: string;
//     cus_id: string;
//     status_id: string;
//     date_start: string;
//     date_pickup: string;
//     amount: number;
//     totalprice: number;
//     delivery_id: string;
// }

// function createData(
//     id: string,
//     cus_id: string,
//     status_id: string,
//     date_start: string,
//     date_pickup: string,
//     amount: number,
//     totalprice: number,
//     delivery_id: string,
// ): Data {
//     return { id, cus_id, status_id, date_start, date_pickup, amount, totalprice, delivery_id };
// }

// Make an HTTP request to the API endpoint to fetch the data
// async function fetchRows(): Promise<Data[]> {
//     const response = await axios.get('http://127.0.0.1:8000/orderlist');
//     const data = response.data;
//     // Map the API response to an array of Data objects using the createData function
//     const rows = data.map((item: any) => {
//         return createData(
//             item.id,
//             item.cus_id,
//             item.status_id,
//             item.date_start,
//             item.date_pickup,
//             item.amount,
//             item.totalprice,
//             item.delivery_id,
//         );
//     });
//     return rows;
// }

// // Call the fetchRows function to fetch the data from the API
// fetchRows().then((rows) => {
//     console.log(rows);
// });

//export default MyComponent;


export default function StickyHeadTable() {
    type ResponseData = number[][];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

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




    return (

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <HeaderToolbar></HeaderToolbar>
            <Box sx={{ width: '98%', m: 1, display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                <Button variant="contained" sx={{ bgcolor: '#5E35B1' }}>
                    + เพิ่มคำสั่งใหม่
                </Button>
            </Box>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{justifyContent: "center"}}>รหัสคำสั่งจัดทำ</TableCell>
                            <TableCell>ชื่อลูกค้า</TableCell>
                            <TableCell>สถานะ</TableCell>
                            <TableCell>วันที่เริ่มทำป้าย</TableCell>
                            <TableCell>วันที่ได้รับป้าย</TableCell>
                            <TableCell>จำนวน</TableCell>
                            <TableCell>ราคา</TableCell>
                            <TableCell>วิธีการรับป้าย</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell sx={{justifyContent: "center"}}>{row.id}</TableCell>
                                <TableCell>{row.cus_id}</TableCell>
                                <TableCell>{row.status_id}</TableCell>
                                <TableCell>{row.date_start}</TableCell>
                                <TableCell>{row.date_pickup}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.totalprice}</TableCell>
                                <TableCell>{row.delivery_id}</TableCell>
                            </TableRow>
                        ))}
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

