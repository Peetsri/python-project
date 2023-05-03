import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { CardMedia, InputLabel, Link, MenuItem, Select, Stack } from "@mui/material";
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
import imgCard from "../assets/33.png";
import Image from 'next/image'
import HeaderToolbar from "@/components/HeaderToolbar";
import { useEffect, useState } from 'react';
import axios from "axios";
//import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router';



export default function DesignDetail() {
  //const navigate = useNavigate();
  //const history = useHistory();
  // const handleGoBack = () => {
  //   history.goBack();
  // };
  const [order, setOrder] = useState({

    id: '',
    cus_id: '',
    status_id:  '',
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
  const [statusName, setstatusName] = useState<string>("");
  const router = useRouter();
  const orderID = router.query.orderId;
  const [isPrintButton, setIsPrintButton] = useState(false);
  const [isSetLEDButton, setIsSetLEDButton] = useState(true);
  const [isShowPicButton, setIsShowPicButton] = useState(true);
  const [isShowPicLEDButton, setIsShowPicLEDButton] = useState(true);

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

  useEffect(() => {

    async function checkButton() {
      console.log('ststus', order.status_id)
      if (order.status_id == '1') {
        setstatusName("คำสั่งทำป้ายใหม่")
      }
      else if (order.status_id == '2') {
        setstatusName("ยืนยันการชำระเงิน")
      }
      else if (order.status_id == '3') {
        setstatusName("Confirm แบบทำป้ายไฟ")
      }
      else if (order.status_id == '4') {
        setstatusName("กำลังจัดทำ")
      }
      else if (order.status_id == '5') {
        setstatusName("จัดทำแล้วเสร็จ")
      }
      else if (order.status_id == '6') {
        setstatusName("จัดส่งแล้วเสร็จ")
      }
      else if (order.status_id == '7') {
        setstatusName("ยกเลิก")
      }
      else {
        //setstatusName("ยกเลิก")
      }

    }
    checkButton()
  }, []);

  const handleSetLEDButton = async () => {
    setIsSetLEDButton(false)
    setIsPrintButton(true)
    setIsShowPicButton(false)
   // window.location.href = '/order-list';
  };

  const base64String = order.picture_original;
  const base64String1 = order.picture_led;


  return (
    <div>
      <HeaderToolbar></HeaderToolbar>
      <Box sx={{ display: { xs: "block", md: "flex" } }}>
        <Box sx={{ width: "50%", mt: 2, ml: 0 }}>
          <Box sx={{ width: "98%", ml: 5, display: "flex" }}>
            {/* <h4>สถานะ : {statusName}</h4> */}
          </Box>
        </Box>

        <Box sx={{ width: "50%", mt: 3, ml: 8 }}>
          <Box
            sx={{
              width: "98%",
              mt: 0, mr: 10,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <h4>รหัสคำสั่งจัดทำ : {order.id} </h4>
          </Box>
        </Box>
      </Box>

      <Box 
       display="flex"
       alignItems="center"
       justifyContent="center"
      sx={{ width: "100%", mt: 2, ml: 0 }}>
         {isShowPicButton && <Image src={base64String} alt="My Image" width={910} height={600} />}
         {isPrintButton && <Image src={base64String1} alt="My Image" width={910} height={600} />}
        {/* <img src={imgCard}/> comment ปิดไปก่อนเพราะว่าเดี๋ยวย้ายรูปไปไว้ใน public folder แทนได้เลยครับ */}
        {/* //<Image src="/picture/test.png" alt="test" width={950} height={600} /> */}
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", mt: 3, display: { xs: "inline-flex", md: "flex" } }}
      >
        {isPrintButton && <Button variant="contained" sx={{ bgcolor: "#5E35B1" }}>
          พิพม์
        </Button>}
        {isSetLEDButton && <Button variant="contained" sx={{ ml: 2, bgcolor: "#5E35B1" }} onClick={handleSetLEDButton}>
          วางหลอด LED
        </Button>}
      </Box>

      <Box sx={{ width: "98%", m: 1, display: "flex" }}>
        <Link href={`/order-list/edit/`}> Back </Link>
        {/* <Button onClick={handleGoBack}>Go back</Button> */}
      </Box>

      <Box sx={{ m: -3, mr: 3, mt: 5 }}>
        <SimpleBottomNavigation />
      </Box>
    </div>
  );
}
