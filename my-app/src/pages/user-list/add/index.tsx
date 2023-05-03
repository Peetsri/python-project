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
import SimpleBottomNavigation from "../../../components/Footer";
import { Button } from "@mui/material";
import HeaderToolbar from "@/components/HeaderToolbar";
import axios from "axios";
import { useEffect, useState } from 'react';
import { type } from "os";
//import { IAddData } from "@/common/Interface";
//import {calculatePrice} from "@/components/CaculatePrice";
//import { useShareData } from "@/providers/shareDataProvider";


export default function OrderDetaillist() {

  const [inputName, setInputName] = useState<string>("");
  const [inputSurname, setInputSurname] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputTel, setInputTel] = useState<string>("");
  const [inputAddress, setInputAddress] = useState<string>("");
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputRole, setInputRole] = useState<string>("");




  interface selectMenuItem {
    id: string;
    name: string;
  }

  const RoleData: selectMenuItem[] = [
    {
      id: '1',
      name: 'หัวหน้า',

    },
    {
      id: '2',
      name: 'ช่างไฟ',
    },
    {
      id: '3',
      name: 'พนักงานออฟฟิต',
    },
    {
      id: '4',
      name: 'คนขับรถ',
    },
  ]

  const handleOnClick = () => {
    window.location.href = '/user-list'
  }




  const handleNameChange = (e: any) => {
    setInputName(e.target.value);
  };

  const handleSurnameChange = (e: any) => {
    setInputSurname(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setInputEmail(e.target.value);
  };

  const handleTelChange = (e: any) => {
    setInputTel(e.target.value);
  };

  const handleAddressChange = (e: any) => {
    setInputAddress(e.target.value);
  };

  const handleUsernameChange = (e: any) => {
    if (e && e.target) {
      setInputUsername(e.target.value);
    }
  };

  const handlePasswordChange = (e: any) => {
    setInputPassword(e.target.value);
  };

  const handleRoleChange = (e: any) => {
    setInputRole(e.target.value);
  };



  const adduser = async () => {

    let formData = new FormData();
    formData.append('name', inputName);
    formData.append('surname', inputSurname);
    formData.append('email', inputEmail);
    formData.append('tel', inputTel);
    formData.append('address', inputAddress);
    formData.append('username', inputUsername);
    formData.append('password', inputPassword);
    formData.append('role_id', inputRole);

    console.log(formData.get('name'))
    console.log(formData.get('address'))

    const response = await axios.post('http://127.0.0.1:8000/create_user',formData,{
      headers: { "Content-Type": "multipart/form-data" },});
      console.log(response)
    window.location.href = '/user-list';
  }


  return (

    <div>

      <HeaderToolbar></HeaderToolbar>
      <Box sx={{ display: { xs: "block", md: "flex", ml: 5 } }}>
        <Box sx={{ width: "50%", ml: 5 }}>
          <Box sx={{ width: "98%", display: "flex" }}>
            <h3>เพิ่มพนักงาน</h3>
          </Box>

          <h4>ชื่อ *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <TextField
              onChange={handleNameChange} value={inputName}
              label=""
              id="amount_char"
              size="small"
            />
          </FormControl>
          <h4>นามสกุล *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <TextField
              onChange={handleSurnameChange} value={inputSurname}
              label=""
              id="amount"
              size="small"
            />
          </FormControl>
          <h4>อีเมล *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <TextField
              onChange={handleEmailChange} value={inputEmail}
              label=""
              id="amount"
              size="small"
            />
          </FormControl>
          <h4>เบอร์โทรศัพท์ *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <TextField
              onChange={handleTelChange} value={inputTel}
              label=""
              id="amount"
              size="small"
            />
          </FormControl>

        </Box>

        <Box sx={{ width: "50%", mt: 7.5, ml: 8, mr: 5 }}>

          <h4>ที่อยู่ *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <TextField
              label=""
              id="outlined-size-small"
              size="small"
              onChange={handleAddressChange} value={inputAddress}
            />
          </FormControl>
          <h4>Username *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <TextField
              label=""
              id="outlined-size-small"
              size="small"
              onChange={handleUsernameChange} value={inputUsername}
            />
          </FormControl>
          <h4>Password *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <TextField
              label=""
              id="outlined-size-small"
              size="small"
              onChange={handlePasswordChange} value={inputPassword}
            />
          </FormControl>
          <h4>Role *</h4>
          <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
            <InputLabel id="delivery">เลือก</InputLabel>
            <Select
              labelId="delivery"
              id="delivery"
              label="เลือก"
              onChange={handleRoleChange} value={inputRole}

            >

              {RoleData.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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

