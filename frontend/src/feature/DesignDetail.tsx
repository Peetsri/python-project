import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CardMedia, InputLabel, MenuItem, Select, Stack } from '@mui/material';
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
import imgCard from '../assets/33.png';

/* Header/Logo Title */


export const DesignDetail = () => {
    

    return (

        <div>

            <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
                <Box sx={{ width: '50%', mt: 3, ml: 0 }}>
                    <Box sx={{ width: '98%', m: 1, display: "flex" }}>
                        <h4>สถานะ</h4>
                        <br /><h4>คำสั่งทำป้ายไฟใหม่</h4>
                    </Box>

                </Box>

                <Box sx={{ width: '50%', mt: 3, ml: 8 }}>
                    <Box sx={{ width: '98%', m: 1, display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                        <h4>รหัสคำสั่งจัดทำ  1111111</h4>
                    </Box>

                </Box>
            </Box>

            <Box sx={{ width: '100%', mt: 3, ml: 8 }}>
            <img src={imgCard}/>
            </Box>

            <Box sx={{ width: '25%', mt: 3, display: { xs: 'inline-flex', md: 'flex' } }}>
                <Button variant="contained" sx={{ bgcolor: '#5E35B1' }}>
                    ยกเลิก
                </Button>
                <Button variant="contained" sx={{ ml: 2, bgcolor: '#5E35B1' }}>
                    วางหลอด LED
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

    <DesignDetail />
);
