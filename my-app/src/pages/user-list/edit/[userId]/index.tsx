import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputLabel, Link, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import SimpleBottomNavigation from "../../../../components/Footer";
import { Button } from "@mui/material";
import HeaderToolbar from "@/components/HeaderToolbar";
import axios from "axios";
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';


export default function OrderDetaillist() {

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

    const [user, setUser] = useState({

        id: '',
        name: '',
        surname: '',
        email: '',
        tel: '',
        address: '',
        username: '',
        password: '',
        role_id: '',

    });

    useEffect(() => {
        async function fetchOrderDetail() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/user/${userValue}`);
                //http://127.0.0.1:8000/user/7
                console.log(response.data);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOrderDetail();
    }, []);



    const [inputName, setInputName] = useState<string>("");
    const [inputSurname, setInputSurname] = useState<string>("");
    const [inputEmail, setInputEmail] = useState<string>("");
    const [inputTel, setInputTel] = useState<string>("");
    const [inputAddress, setInputAddress] = useState<string>("");
    const [inputUsername, setInputUsername] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [inputRole, setInputRole] = useState<string>("");


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

        const response = await axios.post('http://127.0.0.1:8000/create_user', formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response)
        window.location.href = '/user-list';
    }


    // const [userId, setUserId] = useState(6);
    // const [message, setMessage] = useState('');

    // const handleSubmit = async (event: any) => {
    //     event.preventDefault();
        
    //     const response = await axios.delete('http://127.0.0.1:8000/delete_user_test', {
    //         data: { user_id: userId }
               
    //     });
    //     console.log(response)
    //     window.location.href = '/user-list';

    // }
    const handleSubmit = async (event: any) => {
    //const [userId, setUserId] = useState(6);
    const id = 6;
    const response = await axios.delete(`http://127.0.0.1:8000/delete_user/${id}`)
        console.log(response.data); // Handle success
 
  }

  const router = useRouter();

  const userValue = router.query.userId;

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
                            onChange={handleNameChange}
                            value={user.name}
                            label=""
                            id="amount_char"
                            size="small"
                        />
                    </FormControl>
                    <h4>นามสกุล *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
                        <TextField
                            onChange={handleSurnameChange} value={user.surname}
                            label=""
                            id="amount"
                            size="small"
                        />
                    </FormControl>
                    <h4>อีเมล *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
                        <TextField
                            onChange={handleEmailChange} value={user.email}
                            label=""
                            id="amount"
                            size="small"
                        />
                    </FormControl>
                    <h4>เบอร์โทรศัพท์ *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
                        <TextField
                            onChange={handleTelChange} value={user.tel}
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
                            onChange={handleAddressChange} value={user.address}
                        />
                    </FormControl>
                    <h4>Username *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
                        <TextField
                            label=""
                            id="outlined-size-small"
                            size="small"
                            onChange={handleUsernameChange}
                            value={user.username}
                        />
                    </FormControl>
                    <h4>Password *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
                        <TextField
                            label=""
                            id="outlined-size-small"
                            size="small"
                            onChange={handlePasswordChange}
                            value={user.password}
                        />
                    </FormControl>
                    <h4>Role *</h4>
                    <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
                        <InputLabel id="delivery">เลือก</InputLabel>
                        <Select
                            labelId="delivery"
                            id="delivery"
                            label="เลือก"
                            onChange={handleRoleChange}
                            value={user.role_id}
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

                <Button variant="outlined" startIcon={<DeleteIcon />} type='submit' onClick={handleSubmit}>
                    Delete
                </Button>
                <Button variant="contained" sx={{ bgcolor: "#5E35B1", ml: 2 }} onClick={handleOnClick} >
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

