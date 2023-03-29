import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, Select, Stack } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import SimpleBottomNavigation from '../component/Footer';
import { Button } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

/* Header/Logo Title */


export const OrderDetaillist = () => {

    return (

        <div>

            <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
                <Box sx={{ width: '50%', mt: 3, ml: 0 }}>
                    <Box sx={{ width: '98%', m: 1, display: "flex" }}>
                        <h4>สถานะ</h4>
                        <br /><h4>คำสั่งทำป้ายไฟใหม่</h4>
                    </Box>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: '75%' }}>
                        <FormLabel id="type">ประเภทป้าย *</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="type"
                            name="type"
                            sx={{ mt: 2, minWidth: 120, width: '75%' }}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="ป้ายถือ" />
                            <FormControlLabel value="male" control={<Radio />} label="ที่คาดผม" />
                            <FormControlLabel value="other" control={<Radio />} label="ห้อยคอ" />

                        </RadioGroup>
                    </FormControl>
                    < h4>จำนวนตัวอักษร *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: '75%' }} size='small'>
                        <TextField
                            label="ตัวเลข"
                            id="outlined-size-small"
                            //defaultValue="Small"
                            size="small"
                        />

                    </FormControl>
                    < h4>จำนวนป้าย *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: '75%' }} size='small'>
                        <TextField
                            label="ตัวเลข"
                            id="outlined-size-small"
                            //defaultValue="Small"
                            size="small"
                        />
                    </FormControl>
                    < h4>วิธีการส่ง *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: '75%' }} size='small'>
                        <InputLabel id='delivery'>เลือก</InputLabel>
                        <Select labelId='delivery' id='delivery' value={''} label='เลือก' >
                            <MenuItem value="normal">ส่งธรรมดา</MenuItem>
                            <MenuItem value="ems">ส่งด่วนพิเศษ(EMS)</MenuItem>
                            <MenuItem value="pickup">รับด้วยตนเอง</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ width: '98%', m:1, display: "flex" }}>
                <h4>ราคาไม่รวมค่าส่ง(บาท)</h4> 
                <TextField
                            label="ตัวเลข"
                            id="outlined-size-small"
                            //defaultValue="Small"
                            size="small"
                            sx={{ml:2}}
                        />
               </Box>
               <Box sx={{ width: '98%', m:1, display: "flex" }}>
                <h4>วันที่คาดว่าจะได้รับป้าย</h4> 
                <TextField
                            label="ตัวเลข"
                            id="outlined-size-small"
                            //defaultValue="Small"
                            size="small"
                            sx={{ml:2}}
                        />
               </Box>
                </Box>

                <Box sx={{ width: '50%', mt: 3, ml: 8 }}>
                    <Box sx={{ width: '98%', m: 1, display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                        <h4>รหัสคำสั่งจัดทำ  1111111</h4>
                    </Box>

                    < h4>ขนาดป้าย *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: '75%' }} size='small'>
                        <InputLabel id='size'>เลือก</InputLabel>
                        <Select labelId='size' id='size' value={''} label='เลือก' >
                            <MenuItem value="normal">A4</MenuItem>
                            <MenuItem value="ems">A3</MenuItem>
                            <MenuItem value="pickup">A5</MenuItem>
                        </Select>
                    </FormControl>
                    < h4>จำนวนสัญลักษณ์(icon) *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: '75%' }} size='small'>
                        <TextField
                            label="ตัวเลข"
                            id="outlined-size-small"
                            //defaultValue="Small"
                            size="small"
                        />
                    </FormControl>
                    < h4>วันที่รับป้าย *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: '75%' }} size='small'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker />
                        </LocalizationProvider>
                    </FormControl>

                    < h4>เพิ่มเติมด้ามจับ</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: '75%' }} size='small'>
                        <div>
                            <Checkbox {...label} />

                        </div>

                    </FormControl>
                    < h4>แบบป้าย</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: '75%' }} size='small'>
                        <TextField
                            label="ตัวเลข"
                            id="outlined-size-small"
                            //defaultValue="Small"
                            size="small"
                        />
                        <FormControl sx={{ mt: 0, minWidth: 120, width: '75%' }} size='small'>
                        <Button variant="contained" component="label">
                        Upload
                        <input hidden accept="image/*" multiple type="file" />
                        </Button>
                    </FormControl>
                    </FormControl>
                </Box>
            </Box>

            <Box sx={{ width: '25%', mt: 3, display: { xs: 'inline-flex', md: 'flex' } }}>
            <Button variant="contained" sx={{ bgcolor: '#5E35B1' }}>
                    ยกเลิก
                </Button>
                <Button variant="contained" sx={{ ml:2,bgcolor: '#5E35B1' }}>
                    วางหลอด LED
                </Button>
            </Box>

            <Box sx={{ width: '98%', m: 1, display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                <Button variant="contained" sx={{ bgcolor: '#5E35B1' }}>
                    ประเมินราคา
                </Button>
            </Box>
            <Box sx={{ width: '98%', m: 1, display: "flex" }}>
                <Button variant="contained" sx={{ bgcolor: '#5E35B1' }}>
                    กลับ
                </Button>
            </Box>

            <Box sx={{ m: -3, mr: 3, mt: 5 }}>
                <SimpleBottomNavigation />
            </Box>

        </div>

    );
};

export default () => (

    <OrderDetaillist />
);
