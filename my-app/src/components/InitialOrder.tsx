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

export const InitialOrder = () => {

    return (
        <div>

            <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
                <Box sx={{ width: '50%', mt: 3, ml: 0 }}>
                    <FormControl sx={{ mt: 3, minWidth: 120, width: '75%' }}>
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
                </Box>
              
                <Box sx={{ width: '50%', mt: 3, ml: 8 }}>
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

                </Box>
            </Box>

            <Stack sx={{ mt: 3, height: 'auto', width: '75%' }}>
            </Stack>
            <Box sx={{ width: '25%', mt: 3, display: { xs: 'inline-flex', md: 'flex' } }}>
            </Box>
            
            <Box sx={{ m: -3, mr: 3, mt:5 }}>
                <SimpleBottomNavigation />
            </Box>

        </div>

    );
};

export default () => (

    <InitialOrder />
);
