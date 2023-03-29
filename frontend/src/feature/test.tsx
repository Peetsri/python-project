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
import InitialOrder from '../component/InitialOrder';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const InitialFunctionlistTest = () => {

    return (
       
            <Box sx={{ width: '98%', m: 1, display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>

                <Button variant="contained" sx={{ bgcolor: '#5E35B1' }}>
                    + เพิ่มรายการ
                </Button>
            </Box>
            //<InitialOrder />
           
           
                    
    );
    
};



