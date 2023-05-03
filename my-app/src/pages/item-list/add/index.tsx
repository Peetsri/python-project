import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import SimpleBottomNavigation from "../../../components/Footer";
import { Button } from "@mui/material";
import HeaderToolbar from "@/components/HeaderToolbar";
import axios from "axios";
import { useEffect, useState } from 'react';


export default function OrderDetaillist() {

  const [inputName, setInputName] = useState<string>("");
  const [inputAmount, setInputAmount] = useState<string>("");
  const [inputPriceperitem, setInputPrice] = useState<string>("");

  const handleOnClick = () => {
    window.location.href = '/item-list'
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


  const adduser = async () => {

    let formData = new FormData();
    formData.append('name', inputName);
    formData.append('amount', inputAmount);
    formData.append('priceperitem', inputPriceperitem);

    console.log(formData.get('name'))
    console.log(formData.get('amount'))

    const response = await axios.post('http://127.0.0.1:8000/create_item',formData,{
      headers: { "Content-Type": "multipart/form-data" },});
      console.log(response)
    // axios.post("http://127.0.0.1:8000/submit", formData).then(console.log).catch(console.error)
    window.location.href = '/item-list';
  }


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
                onChange={handleNameChange} value={inputName}
                label=""
                id="amount_char"
                size="small"
              />
            </FormControl>
            <h4>จำนวน *</h4>
            <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
              <TextField
                onChange={handleAmountChange} value={inputAmount}
                label=""
                id="amount"
                size="small"
              />
            </FormControl>
            <h4>ราคาต่อชิ้น *</h4>
            <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
              <TextField
                onChange={handlePriceChange} value={inputPriceperitem}
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
          <Button variant="contained" sx={{ bgcolor: "#5E35B1" }} onClick={handleOnClick} >
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            onClick={adduser}
            type="submit"
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



