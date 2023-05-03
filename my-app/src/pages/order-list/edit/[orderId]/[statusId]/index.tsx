import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SimpleBottomNavigation from "../../../../../components/Footer";
import { Button } from "@mui/material";
import HeaderToolbar from "@/components/HeaderToolbar";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';


const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function OrderDetaillist() {
  //  Order 
  const [order, setOrder] = useState({

    id: '',
    cus_id: '',
    status_id: '',
    date_start: '',
    date_pickup: '',
    totalprice: '',
    amount: '',
    delivery_id: '',
    payment: '',
    itemprice: '',
    product_id: '',
    amount_char: '',
    amount_icon: '',
    handle: '',
    picture_original: '',
    picture_led: '',
    picture_name: ''

  });
  //  User 
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
  const [statusName, setstatusName] = useState<string>("");
  const [statusIDNew, setstatusIDNew] = useState<string>("");
  const [isShowUpload,setIsShowUpload] = useState(true);

  useEffect(() => {
    async function fetchOrderDetail() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/orderlist/${orderID}`);
        console.log(response.data);
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      }
      
    }
    fetchOrderDetail();
  }, []);
  // Get User role
  useEffect(() => {
    async function fetchUserDetail() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/user/1');
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserDetail();
  }, []);

  useEffect(() => {
    async function checkButton() {
      if (statusID == '1') {
        setIsPaidButton(true)
        setstatusName("คำสั่งทำป้ายใหม่")
      }
      else if (statusID == '2') {
        setIsConDesignButton(true)
        setIsDeleltButton(false)
        setstatusName("ยืนยันการชำระเงิน")
      }
      else if (statusID == '3') {
        setIsStartButton(true)
        setIsDeleltButton(false)
        setIsShowUpload(false)
        setstatusName("Confirm แบบทำป้ายไฟ")

      }
      else if (statusID == '4') {
        setIsDoneButton(true)
        setIsDeleltButton(false)
        setIsShowUpload(false)
        setstatusName("กำลังจัดทำ")
      }
      else if (statusID == '5') {
        setIsDeliveredButton(true)
        setIsDeleltButton(false)
        setIsShowUpload(false)
        setstatusName("จัดทำแล้วเสร็จ")
      }
      else if (statusID == '6') {
        setstatusName("จัดส่งแล้วเสร็จ")
        setIsShowUpload(false)
        setIsDeleltButton(false)
        setIsCancelButton(false)
      }
      else if (statusID == '7') {
        setIsShowUpload(false)
        setIsPaidButton(false)
        setIsConDesignButton(false)
        setIsStartButton(false)
        setIsDoneButton(false)
        setIsDeliveredButton(false)
        setIsDeleltButton(false)
        setIsCancelButton(false)
        setstatusName("ยกเลิก")
      }
      else {

        setIsPaidButton(false)
        setIsConDesignButton(false)
        setIsStartButton(false)
        setIsDoneButton(false)
        setIsDeliveredButton(false)
        setIsDeleltButton(false)
        setIsCancelButton(false)

      }

    }
    checkButton()
  }, []);


  
  //const handleOnClick = () =>

  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = (event: any) => {
    setChecked(event.target.checked);

  };

  function checkhandle() {
    if (order.handle === 'true') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }


  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: handle file upload
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }

   
  
    // const handleShowBotton = ()=>{
    //   if (user.role_id == 1 && order.status_id=1):{
    //       return {
    //        namebutton = "วางหลอดไฟ"
    //       }
    //   }else{};
    // }
    // return (
    //   <form onSubmit={handleSubmit}>
    //     <input type="file" onChange={handleFileChange} />
    //     <button type="submit">Upload</button>
    //   </form>
    // );

  }


  const handleSubmitDel = async (event: any) => {
    //const [userId, setUserId] = useState(6);
    const id = order.id;
    const response = await axios.delete(`http://127.0.0.1:8000/delete_order/${id}`)
    console.log(response.data); // Handle success

  }
  const router = useRouter();
  const orderID = router.query.orderId;
  const statusID = router.query.statusId;
  //setstatusIDNew(statusID);
 
  //const [isFieldVisibleBotton, setIsFieldVisibleBotton] = useState(false);
  const [isPaidButton, setIsPaidButton] = useState(false);
  const [isConDesignButton, setIsConDesignButton] = useState(false);
  const [isDeliveredButton, setIsDeliveredButton] = useState(false);
  const [isStartButton, setIsStartButton] = useState(false);
  const [isDoneButton, setIsDoneButton] = useState(false);
  const [isDeleltButton, setIsDeleltButton] = useState(true);
  const [isCancelButton, setIsCancelButton] = useState(true);
  const [isShowDesign, setIsShowDesign] = useState(true);

  const updateOrderPaid = async (orderId: number) => {
    const formData = new FormData();
    const status_id = '2';
    formData.append('status_id',status_id);
    try {
      const response = await axios.put(`http://127.0.0.1:8000/update_order/${orderId}`, formData , {
        headers: { "Content-Type": "multipart/form-data" }
       });
      console.log(response.data);
      window.location.href = '/order-list';
    } catch (error) {
      console.error(error);
    }
  }

  const updateOrderConDesign = async (orderId: number) => {
    const formData = new FormData();
    const status_id = '3';
    formData.append('status_id',status_id);
    try {
      const response = await axios.put(`http://127.0.0.1:8000/update_order/${orderId}`, formData , {
        headers: { "Content-Type": "multipart/form-data" }
       });
      console.log(response.data);
      window.location.href = '/order-list';
    } catch (error) {
      console.error(error);
    }
  }

  const updateOrderStart = async (orderId: number) => {
    const formData = new FormData();
    const status_id = '4';
    formData.append('status_id',status_id);
    try {
      const response = await axios.put(`http://127.0.0.1:8000/update_order/${orderId}`, formData , {
        headers: { "Content-Type": "multipart/form-data" }
       });
      console.log(response.data);
      window.location.href = '/order-list';
    } catch (error) {
      console.error(error);
    }
  }

  const updateOrderDone = async (orderId: number) => {
    const formData = new FormData();
    const status_id = '5';
    formData.append('status_id',status_id);
    try {
      const response = await axios.put(`http://127.0.0.1:8000/update_order/${orderId}`, formData , {
        headers: { "Content-Type": "multipart/form-data" }
       });
      console.log(response.data);
      window.location.href = '/order-list';
    } catch (error) {
      console.error(error);
    }
  }

  const updateOrderDelevered = async (orderId: number) => {
    const formData = new FormData();
    const status_id = '6';
    formData.append('status_id',status_id);
    try {
      const response = await axios.put(`http://127.0.0.1:8000/update_order/${orderId}`, formData , {
        headers: { "Content-Type": "multipart/form-data" }
       });
      console.log(response.data);
      window.location.href = '/order-list';
    } catch (error) {
      console.error(error);
    }
  }


  const updateOrderCancel = async (orderId: number) => {
    const formData = new FormData();
    const status_id = '7';
    formData.append('status_id',status_id);
    try {
      const response = await axios.put(`http://127.0.0.1:8000/update_order/${orderId}`, formData , {
        headers: { "Content-Type": "multipart/form-data" }
       });
      console.log(response.data);
      window.location.href = '/order-list';
    } catch (error) {
      console.error(error);
    }
  }

  const handlePaidButton = async () => {
     const order_id = Number(order.id);
     await updateOrderPaid (order_id );
  };

  const handleConDesignButton = async () => {
    const order_id = Number(order.id);
    await updateOrderConDesign (order_id );
  };

  const handleStartButton = async () => {
    const order_id = Number(order.id);
    await updateOrderStart (order_id );
  };

  const handleDoneButton = async () => {
    const order_id = Number(order.id);
    await updateOrderDone (order_id );
  };

  const handleDeliveredButton = async () => {
    const order_id = Number(order.id);
    await updateOrderDelevered (order_id );
  };

  const handleCancelButton = async () => {
    const order_id = Number(order.id);
    await updateOrderCancel (order_id );
  };


  return (
    <>
      <div>

        <HeaderToolbar></HeaderToolbar>
        {/* My Value: {orderID} */}
        <Box sx={{ display: { xs: "block", md: "flex", ml: 5 } }}>
          <Box sx={{ width: "50%", ml: 5, mt: 3 }}>
            <Box sx={{ width: "98%", display: "flex" }}>
              <h4>  สถานะ : {statusName} </h4>
              <br />
            </Box>
            <FormControl sx={{ mt: 0, minWidth: 120, width: "75%", md: 1 }}>
              <FormLabel id="type">ประเภทป้าย *</FormLabel>
              {order.product_id}
            </FormControl>
            <h4>จำนวนตัวอักษร *</h4>
            <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
              <TextField
                label=""
                id="outlined-size-small"
                value={order.amount_char}
                size="small"
              />
            </FormControl>
            <h4>จำนวนป้าย *</h4>
            <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
              <TextField
                label=""
                id="outlined-size-small"
                value={order.amount}
                size="small"
              />
            </FormControl>
            <h4>วิธีการส่ง *</h4>
            <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
              <TextField
                label=""
                value={order.delivery_id}
                id="outlined-size-small"
                //defaultValue="Small"
                size="small"
              />
            </FormControl>
            <Box sx={{ width: "98%", mt: 0, display: "flex" }}>
              <h4>ราคาต่อสินค้า(บาท) : {order.itemprice}  </h4>
            </Box>
            <Box sx={{ width: "98%", mt: -2, display: "flex" }}>
              <h4>ราคาทั้งหมดไม่รวมค่าส่ง(บาท) : {order.totalprice}  </h4>
            </Box>
            <Box sx={{ width: "98%", mt: -2, display: "flex" }}>
              <h4>วันที่คาดว่าจะได้รับป้าย : {order.date_pickup} </h4>
            </Box>
          </Box>

          <Box sx={{ width: "50%", mt: 3, ml: 8, mr: 5 }}>
            <Box
              sx={{
                width: "98%",
                m: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <h4>รหัสคำสั่งจัดทำ : {order.id} </h4>
            </Box>

            <h4>ขนาดป้าย *</h4>
            <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
              <TextField
                label=""
                value={order.product_id}
                id="outlined-size-small"
                //defaultValue="Small"
                size="small"
              />
            </FormControl>
            <h4>จำนวนสัญลักษณ์(icon) *</h4>
            <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
              <TextField
                label=""
                value={order.amount_icon}
                id="outlined-size-small"
                //defaultValue="Small"
                size="small"
              />
            </FormControl>
            <h4>วันที่รับป้าย *</h4>
            <FormControl sx={{ mt: 0, minWidth: 120, width: "75%" }} size="small">
              <TextField
                label=""
                value={order.date_pickup}
                id="outlined-size-small"
                //defaultValue="Small"
                size="small"
              />
            </FormControl>
        
            {isShowUpload && <Box sx={{ width: "100%", mt: 0, ml: 0, mr: 5 }}>
              <h4>แบบป้าย </h4>
              {/* // Form Upload image // */}
              <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload แบบป้าย</button>
              </form>
            </Box>}

            {!isShowUpload && <Box sx={{ width: "100%", mt: 0, ml: 0, mr: 5 }}>
              <h4>แบบป้าย </h4>
              {/* // Form Upload image // */}
             <Link href={`/design-detail/${orderID}`}> ดูแบบป้ายไฟ </Link>
            </Box>}

          </Box>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ width: "100%", mt: 3, display: { xs: "inline-flex", md: "flex" } }}
        >
          {isDeleltButton && <Button variant="outlined" startIcon={<DeleteIcon />} type='submit' onClick={handleSubmitDel}>
            Delete
          </Button>}
          {isCancelButton && <Button variant="contained" sx={{ bgcolor: "#ff0000", ml: 2 }} onClick={handleCancelButton}>
            ยกเลิกคำสั่งซื้อ
          </Button>}

          {isPaidButton && <Button variant="contained" sx={{ ml: 2, bgcolor: "#5E35B1" }} onClick={handlePaidButton}>
            ชำระเงิน
          </Button>
          }
          {isConDesignButton && <Button variant="contained" sx={{ ml: 2, bgcolor: "#5E35B1" }} onClick={handleConDesignButton}>
            Confirm แบบ
          </Button>}
          {isStartButton && <Button variant="contained" sx={{ ml: 2, bgcolor: "#5E35B1" }} onClick={handleStartButton}>
            เริ่มทำงาน
          </Button>}
          {isDoneButton && <Button variant="contained" sx={{ ml: 2, bgcolor: "#5E35B1" }} onClick={handleDoneButton}>
            จัดทำสำเร็จ
          </Button>}
          {isDeliveredButton && <Button variant="contained" sx={{ ml: 2, bgcolor: "#5E35B1" }} onClick={handleDeliveredButton}>
            ส่งสินค้าสำเร็จ
          </Button>}

        </Box>

        <Box sx={{ width: "98%", m: 1, display: "flex" }}>
          <Link href={"/order-list"}> Back </Link>
        </Box>

        <Box sx={{ m: -3, mr: 3, mt: -2 }}>
          <SimpleBottomNavigation />
        </Box>
      </div>
    </>
  );
}
