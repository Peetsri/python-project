import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputLabel, Link, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Checkbox from "@mui/material/Checkbox";
import SimpleBottomNavigation from "../../../../components/Footer";
import { Button } from "@mui/material";
import HeaderToolbar from "@/components/HeaderToolbar";
import axios from "axios";
import { useEffect, useState } from 'react';
import { type } from "os";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';



export default function OrderDetaillist() {


    const [item, setItem] = useState({

        id: '',
        name: '',
        priceperitem: '',
        amount: '',
        booking: '',

    });

    useEffect(() => {
        async function fetchItem() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/item/${itemValue}`);
                console.log(response.data);
                setItem(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchItem();
    }, []);



    const [inputName, setInputName] = useState<string>("");
    const [inputAmount, setInputAmount] = useState<string>("");
    const [inputPriceperitem, setInputPrice] = useState<string>("");

    const handleOnClick = () => {
        window.location.href = '/order-list'
    }

    const handleNameChange = (e: any) => {
        if (e && e.target) {
            setInputName(e.target.value);
        }
    };

    const handleAmountChange = (e: any) => {
        setInputAmount(e.target.value);
    };

    const handlePriceChange = (e: any) => {
        setInputPrice(e.target.value);
    };


    const additem = async () => {

        let formData = new FormData();
        formData.append('name', inputName);
        formData.append('amount', inputAmount);
        formData.append('priceperitem', inputPriceperitem);

        console.log(formData.get('name'))
        console.log(formData.get('amount'))

        const response = await axios.post('http://127.0.0.1:8000/create_item', formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response)
        window.location.href = '/item-list';
    }


    const handleSubmit = async (event: any) => {
        const id = 12;
        const response = await axios.delete(`http://127.0.0.1:8000/delete_item/${id}`)
        console.log(response.data); // Handle success

    }

    const router = useRouter();

    const itemValue = router.query.itemId;

    return (

        <div>

            <HeaderToolbar></HeaderToolbar>
            <Box sx={{ display: { xs: "block", md: "flex", ml: 5 } }}>
                <Box sx={{ width: "50%", ml: 5 }}>
                    <Box sx={{ width: "98%", display: "flex" }}>
                        <h3>เพิ่มอุปกรณ์</h3>
                    </Box>

                    <h4>ชื่ออุปกรณ์ *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
                        <TextField
                            onChange={handleNameChange} value={item.name}
                            label=""
                            id="amount_char"
                            size="small"
                        />
                    </FormControl>
                    <h4>จำนวน *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
                        <TextField
                            onChange={handleAmountChange} value={item.amount}
                            label=""
                            id="amount"
                            size="small"
                        />
                    </FormControl>
                    <h4>ราคาต่อชิ้น *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
                        <TextField
                            onChange={handlePriceChange} value={item.priceperitem}
                            label=""
                            id="amount"
                            size="small"
                        />
                    </FormControl>


                </Box>

                <Box sx={{ width: "50%", mt: 7.5, ml: 8, mr: 5 }}>



                </Box>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ width: "100%", mt: 3, display: { xs: "inline-flex", md: "flex" } }}
            >

          
                <Button variant="outlined" startIcon={<DeleteIcon />} type= 'submit' onClick={handleSubmit}>
                    Delete
                </Button>
                <Button variant="contained" sx={{ bgcolor: "#5E35B1", ml: 2 }} onClick={handleOnClick} >
                    ยกเลิก
                </Button>
                <Button
                    variant="contained"
                    onClick={additem}
                    //onClick={(e) => estimateprice(e,delivery_id,amount,amount_char,amount_icon,date_pickup,product_id,handle,picture_original)}
                    sx={{
                        ml: 2,
                        bgcolor: "#5E35B1"
                    }}>
                    บันทึก
                </Button>
            </Box>

            <Box sx={{ m: -3, mr: 3, mt: 0 }}>
                <SimpleBottomNavigation />
            </Box>
        </div>
    );
}

